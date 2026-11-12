// Runs after `next build` (see the "build" script in package.json).
//
// The site is a static export, so there is no server to hand out a fresh nonce per request. Instead this script reads every
// built page, hashes each inline <script> (Next's bootstrap and data scripts plus our own intro guard), and puts those
// hashes in a <meta http-equiv="Content-Security-Policy"> at the very top of the page's <head>.
//
// vercel.json sends the rest of the policy as a header. Browsers apply every policy they are given, so a script only
// runs if BOTH allow it: the header allows 'self' + inline, and this tag narrows inline down to the exact hashes.
// A script injected into a page later has no hash and is blocked.
//
//   node scripts/csp-hash.mjs
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
// <script type="application/ld+json"> and the like are data, not code: CSP does not apply to them
const isCode = (attrs) => {
  const m = /\btype\s*=\s*["']?([^"'\s>]+)/i.exec(attrs);
  return !m || /^(module|text\/javascript|application\/javascript)$/i.test(m[1]);
};

const pages = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) pages.push(p);
  }
})(OUT);

let total = 0;
for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const hashes = new Set();
  for (const [, attrs, body] of html.matchAll(SCRIPT)) {
    if (/\bsrc\s*=/i.test(attrs) || !body.trim() || !isCode(attrs)) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  const policy = `script-src 'self' ${[...hashes].join(" ")}`;
  const tag = `<meta http-equiv="Content-Security-Policy" content="${policy}"/>`;
  if (!/<head[^>]*>/i.test(html)) throw new Error(`${file}: no <head> to put the policy in`);
  writeFileSync(file, html.replace(/<head([^>]*)>/i, (m) => m + tag));
  total += hashes.size;
}
console.log(`csp-hash: ${pages.length} pages, ${total} inline script hashes`);
