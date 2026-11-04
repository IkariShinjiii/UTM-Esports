// Cuts the hero dragon (public/images/dragon-ink.webp) into the layers the hero animates.
//
//   node scripts/cut-dragon.mjs
//
// Writes public/images/dragon-head.webp, dragon-m{0..5}r.webp and dragon-m{0..5}t.webp, and
// src/components/dragonLayers.ts (where each layer sits and where it pivots).
//
// How the cut works. The mane is split into 6 horizontal strips, and each strip into a root piece and a tip
// piece (the tip piece is nested inside the root piece when animated, so it follows it). Every pixel of the
// original gets a weight for each layer, and the weights of all layers add up to 1. A layer's opacity at that
// pixel is 1 - (1 - a)^w, where a is the original opacity. Stacked with normal "over" compositing the layers
// then add up to exactly the original (even for the semi-transparent grain), so nothing shows at rest, and
// when strips move a little relative to each other there is no gap between them.
//
// The edge between the head and the mane runs through the empty red gap beside the horn (so no flame is
// split) and through solid dark further down, where the fade is only allowed over solid ink.
//
// Needs `sharp` (installed with Next.js). Re-run this if the mark artwork changes.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(root, "public/images/dragon-ink.webp");
const IMG = path.join(root, "public/images");
const TS = path.join(root, "src/components/dragonLayers.ts");
const W = 791;
const H = 629;

// The mane region (source pixels). Everything to the right of this outline moves; the head stays.
const MANE = [[557, 0], [791, 0], [791, 540], [445, 540], [445, 520], [420, 500], [400, 455], [372, 405], [350, 345], [365, 300], [440, 268], [520, 242], [528, 228], [540, 205], [548, 180], [557, 150]];
// The fade between head and mane may only reach into solid dark head, never over the horn or wisps.
const FADE_ZONE = [[330, 242], [530, 242], [530, 560], [330, 560]];
const FADE = 46;
// Strips: boundaries in y (the first and last are the mane's top and bottom). Strips blend over +-STRIP_BLEND px.
const BOUNDS = [60, 150, 240, 320, 400, 470, 545];
const STRIP_BLEND = 24;
// Root and tip pieces meet at this x and blend over +-TIP_BLEND px.
const TIP_X = 600;
const TIP_BLEND = 28;
// Where each strip pivots: its root, inside the dark mass next to the head.
const ROOT_PIVOT_X = 480;
const MIN_WEIGHT = 0.02;
const QUALITY = 66;

const smooth = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
const inPoly = (x, y, p) => { let c = false; for (let i = 0, j = p.length - 1; i < p.length; j = i++) { const [xi, yi] = p[i], [xj, yj] = p[j]; if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c; } return c; };
const rect = (p) => { const m = new Uint8Array(W * H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) m[y * W + x] = inPoly(x + 0.5, y + 0.5, p) ? 1 : 0; return m; };
function distance(m) { // distance in px from the nearest masked pixel (chamfer)
  const d = new Float32Array(W * H); for (let i = 0; i < d.length; i++) d[i] = m[i] ? 0 : 1e9;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let v = d[y * W + x]; if (x > 0) v = Math.min(v, d[y * W + x - 1] + 1); if (y > 0) v = Math.min(v, d[(y - 1) * W + x] + 1); if (x > 0 && y > 0) v = Math.min(v, d[(y - 1) * W + x - 1] + 1.4142); if (x < W - 1 && y > 0) v = Math.min(v, d[(y - 1) * W + x + 1] + 1.4142); d[y * W + x] = v; }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { let v = d[y * W + x]; if (x < W - 1) v = Math.min(v, d[y * W + x + 1] + 1); if (y < H - 1) v = Math.min(v, d[(y + 1) * W + x] + 1); if (x < W - 1 && y < H - 1) v = Math.min(v, d[(y + 1) * W + x + 1] + 1.4142); if (x > 0 && y < H - 1) v = Math.min(v, d[(y + 1) * W + x - 1] + 1.4142); d[y * W + x] = v; }
  return d;
}

const { data } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const hard = rect(MANE), zone = rect(FADE_ZONE), dist = distance(hard);
const N = BOUNDS.length - 1; // strips
// weights[layer][pixel]; layers: 0 = head, then for each strip i: root (1 + 2i), tip (2 + 2i)
const L = 1 + 2 * N;
const weights = Array.from({ length: L }, () => new Float32Array(W * H));
const stripStep = (y, k) => smooth((y - (BOUNDS[k] - STRIP_BLEND)) / (2 * STRIP_BLEND)); // 0 above boundary k, 1 below
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const p = y * W + x;
  const mane = hard[p] ? 1 : zone[p] && dist[p] < FADE ? smooth(1 - dist[p] / FADE) : 0;
  weights[0][p] = 1 - mane;
  if (mane === 0) continue;
  const tip = smooth((x - (TIP_X - TIP_BLEND)) / (2 * TIP_BLEND));
  for (let i = 0; i < N; i++) {
    const above = i === 0 ? 0 : stripStep(y, i); // 1 once we are past this strip's top boundary
    const below = i === N - 1 ? 1 : 1 - stripStep(y, i + 1); // 1 until we reach the next boundary
    const s = i === 0 ? below : i === N - 1 ? above : Math.max(0, above + below - 1);
    weights[1 + 2 * i][p] = mane * s * (1 - tip);
    weights[2 + 2 * i][p] = mane * s * tip;
  }
}
// Drop tiny weights and renormalise so every pixel's weights still add up to exactly 1
for (let p = 0; p < W * H; p++) {
  let sum = 0;
  for (let l = 0; l < L; l++) { if (weights[l][p] < MIN_WEIGHT) weights[l][p] = 0; sum += weights[l][p]; }
  for (let l = 0; l < L; l++) weights[l][p] /= sum || 1;
}

const out = [];
for (let l = 0; l < L; l++) {
  const buf = Buffer.from(data);
  let x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let p = 0; p < W * H; p++) {
    const a = data[p * 4 + 3] / 255, w = weights[l][p];
    const alpha = w > 0 ? 1 - Math.pow(1 - a, w) : 0;
    const v = Math.round(alpha * 255);
    buf[p * 4 + 3] = v;
    if (v > 2) { const x = p % W, y = (p / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  if (x1 < 0) { out.push(null); continue; }
  const name = l === 0 ? "dragon-head" : `dragon-m${(l - 1) >> 1}${l % 2 === 1 ? "r" : "t"}`;
  const box = { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
  await sharp(buf, { raw: { width: W, height: H, channels: 4 } }).extract({ left: box.x, top: box.y, width: box.w, height: box.h }).webp({ quality: QUALITY, alphaQuality: 80, effort: 6 }).toFile(path.join(IMG, name + ".webp"));
  out.push({ name, box, bytes: fs.statSync(path.join(IMG, name + ".webp")).size });
}

// Placement data for the component, in percent of the layer's parent box
const pct = (v, of) => Math.round((v / of) * 100000) / 1000;
const rel = (b, parent) => ({ left: pct(b.x - parent.x, parent.w), top: pct(b.y - parent.y, parent.h), width: pct(b.w, parent.w), height: pct(b.h, parent.h) });
const full = { x: 0, y: 0, w: W, h: H };
const origin = (px, py, b) => [pct(px - b.x, b.w), pct(py - b.y, b.h)];
const strips = [];
for (let i = 0; i < N; i++) {
  const r = out[1 + 2 * i], t = out[2 + 2 * i];
  if (!r) continue;
  const yc = (BOUNDS[i] + BOUNDS[i + 1]) / 2;
  strips.push({
    root: { src: `/images/${r.name}.webp`, ...rel(r.box, full), origin: origin(ROOT_PIVOT_X, yc, r.box) },
    tip: t ? { src: `/images/${t.name}.webp`, ...rel(t.box, r.box), origin: origin(TIP_X, yc, t.box) } : null,
  });
}
const head = out[0];
const ts = `// Generated by scripts/cut-dragon.mjs. Do not edit by hand: re-run the script.
// Positions are percentages of the box the layer sits in: the whole mark for the head and each strip's root
// piece, and the root piece for its tip piece (the tip is nested inside the root so it follows it).
// "origin" is the pivot the piece turns around, as a percentage of its own box.
export type DragonPiece = { src: string; left: number; top: number; width: number; height: number; origin: [number, number] };
export const dragonHead = ${JSON.stringify({ src: `/images/${head.name}.webp`, ...rel(head.box, full) })};
export const dragonStrips: { root: DragonPiece; tip: DragonPiece | null }[] = ${JSON.stringify(strips, null, 2)};
`;
fs.writeFileSync(TS, ts);
const total = out.filter(Boolean).reduce((a, o) => a + o.bytes, 0);
for (const o of out) if (o) console.log(String(Math.round(o.bytes / 1024)).padStart(4), "kB", o.name, `${o.box.w}x${o.box.h}`);
console.log("total", Math.round(total / 1024), "kB in", out.filter(Boolean).length, "files");
