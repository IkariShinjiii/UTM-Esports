"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MIN_MS = 2200; // the dragon breathes fire for at least this long
const FLY = 1.5; // seconds the logo takes to travel into the nav

// One flame blade: pointed at the tip (left) and at the neck (right, where it leaves the mouth), drawn in a 100 x 32 box
const FLAME = "M100 16C88 6 70 1 50 5C32 9 16 8 0 13C18 17 30 26 52 27C74 28 90 22 100 16Z";
// The blades fan out of the mouth, longest underneath. len is in logo widths, rot in degrees (negative = down-left).
const BLADES = [
  { len: 2.1, rot: -6, flip: 1 },
  { len: 1.8, rot: -16, flip: -1 },
  { len: 1.9, rot: 3, flip: -1 },
  { len: 1.4, rot: -24, flip: 1 },
  { len: 1.5, rot: 9, flip: 1 },
  { len: 1.1, rot: -11, flip: -1 },
];
// The three layers inside each blade, as a share of its length and thickness
const LAYERS = [{ x: 1, y: 1 }, { x: 0.82, y: 0.62 }, { x: 0.5, y: 0.3 }];

export const INTRO_KEY = "utm-intro-seen";

// Runs in <head>-adjacent markup before React: marks the page as loading (so the hero holds its entrance and the
// nav logo stays hidden) unless this visit has already seen the intro or the visitor prefers reduced motion.
export const introGuard = `try{var d=document.documentElement,p=new URLSearchParams(location.search).has("intro"),s=sessionStorage.getItem("${INTRO_KEY}")==="1",r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(p||(!s&&!r)){d.classList.add("is-loading","logo-pending")}else{d.setAttribute("data-intro","skip")}}catch(e){}`;

// The first-visit intro: a dark screen with the logo (it rises in and a light sweeps across it) and a striped
// loading bar. Then the logo flies up into its place in the nav while the screen lifts away. It plays once per
// visit (add ?intro to the address to see it again) and is skipped for reduced motion.
export function Preloader() {
  const [status, setStatus] = useState<"run" | "done">("run");
  const [rect, setRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const fly = useRef<HTMLDivElement>(null);
  const fireWrap = useRef<HTMLDivElement>(null);
  const hasRect = rect !== null;

  // Where the logo sits in the centred layout, so the flying copy can start exactly there
  useLayoutEffect(() => {
    const measure = () => {
      const r = slot.current?.getBoundingClientRect();
      if (r) setRect({ left: r.left, top: r.top, width: r.width, height: r.height });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const forced = new URLSearchParams(location.search).has("intro");
    let seen = false;
    try { seen = sessionStorage.getItem(INTRO_KEY) === "1"; } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finish = () => {
      html.classList.remove("is-loading", "logo-pending");
      html.style.overflow = "";
      try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
      setStatus("done");
    };
    if (!forced && (seen || reduced)) { finish(); return; }

    html.classList.add("is-loading", "logo-pending");
    html.style.overflow = "hidden";
    let dead = false;
    let tl: gsap.core.Timeline | undefined;
    // counted from when the page started loading, so a slow connection does not add the delay on top
    const minimum = new Promise((r) => setTimeout(r, Math.max(0, MIN_MS - performance.now())));
    const loaded = new Promise<void>((r) => {
      if (document.readyState === "complete") r();
      else window.addEventListener("load", () => r(), { once: true });
      setTimeout(r, 1500); // never hold the visitor for slow images
    });
    Promise.all([minimum, loaded]).then(() => {
      if (dead || !fly.current || !screen.current) return;
      const from = fly.current.getBoundingClientRect();
      const target = document.querySelector("header a img")?.getBoundingClientRect();
      const dx = target ? target.left + target.width / 2 - (from.left + from.width / 2) : 0;
      const dy = target ? target.top + target.height / 2 - (from.top + from.height / 2) : 0;
      const scale = target ? target.height / from.height : 1;
      const end = 0.3 + FLY;
      const blades = fireWrap.current ? Array.from(fireWrap.current.querySelectorAll("[data-blade]")) : [];
      tl = gsap.timeline({ onComplete: finish });
      // the flames snap back into the mouth as the logo sets off
      tl.to(blades, { scaleX: 0, duration: 0.26, ease: "power2.in", stagger: 0.03 }, 0)
        .set(fireWrap.current, { autoAlpha: 0 }, 0.5)
        .to(fly.current, { x: dx, y: dy, scale, duration: FLY, ease: "power3.inOut" }, 0.3)
        .to(screen.current, { yPercent: -100, duration: FLY * 0.75, ease: "power3.inOut" }, 0.7)
        .add(() => { html.classList.remove("is-loading"); html.style.overflow = ""; }, 1.1)
        .add(() => html.classList.remove("logo-pending"), end - 0.15)
        .to(fly.current, { autoAlpha: 0, duration: 0.35, ease: "none" }, end);
    });

    return () => {
      dead = true;
      tl?.kill();
      html.classList.remove("is-loading", "logo-pending");
      html.style.overflow = "";
    };
  }, []);

  // The dragon breathes fire out of its mouth (to the left): flat flame blades that shoot out one after another, then
  // flicker (each layer on its own beat) until the logo sets off. All driven by GSAP.
  useEffect(() => {
    if (!hasRect || !fireWrap.current) return;
    if (document.documentElement.getAttribute("data-intro") === "skip") return;
    const wrap = fireWrap.current;
    const unit = slot.current?.getBoundingClientRect().width ?? 150; // fire scales with the logo
    const room = parseFloat(wrap.style.left) - 8; // space left of the mouth, so the flames never leave the screen
    const blades = Array.from(wrap.querySelectorAll<HTMLElement>("[data-blade]"));
    const ctx = gsap.context(() => {
      blades.forEach((el, i) => {
        const b = BLADES[i];
        const len = Math.min(unit * b.len, room);
        const h = len * 0.2;
        gsap.set(el, { width: len, height: h, top: -h / 2, rotation: b.rot, scaleY: b.flip, scaleX: 0, transformOrigin: "100% 50%" });
        el.querySelectorAll<SVGSVGElement>("[data-layer]").forEach((layer, j) => {
          const base = LAYERS[j];
          gsap.set(layer, { scaleX: base.x, scaleY: base.y, transformOrigin: "100% 50%" });
          gsap.to(layer, {
            scaleX: () => base.x * gsap.utils.random(0.8, 0.95),
            scaleY: () => base.y * gsap.utils.random(0.85, 1.05),
            duration: () => gsap.utils.random(0.13, 0.24),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            repeatRefresh: true,
            delay: 0.9 + gsap.utils.random(0, 0.2),
          });
        });
      });
      gsap.to(blades, { scaleX: 1, duration: 0.4, ease: "power3.out", stagger: 0.07, delay: 0.25 });
    }, wrap);
    return () => ctx.revert();
  }, [hasRect]);

  if (status === "done") return null;
  return (
    <>
      <div ref={screen} className="preloader" role="status" aria-label="Loading UTM Esports">
        <div className="text-center">
          <div ref={slot} className="mx-auto" style={{ width: "clamp(6.5rem, 20vw, 9.5rem)", aspectRatio: "360 / 325" }} />
        </div>
      </div>
      {rect && (
        <div ref={fireWrap} aria-hidden="true" className="preloader__fire" style={{ left: rect.left + rect.width * 0.1, top: rect.top + rect.height * 0.665 }}>
          {BLADES.map((_, i) => (
            <div key={i} data-blade className="preloader__blade">
              {["fl-cut", "fl-flame", "fl-core"].map((c) => (
                <svg key={c} data-layer viewBox="0 0 100 32" preserveAspectRatio="none" className={`preloader__layer ${c}`}>
                  <path d={FLAME} />
                </svg>
              ))}
            </div>
          ))}
        </div>
      )}
      {rect && (
        <div ref={fly} aria-hidden="true" className="preloader__logo" style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height, willChange: "transform" }}>
          <div className="preloader__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/utm-logo-white.png" alt="" className="size-full object-contain" />
            <div className="preloader__shine" />
          </div>
        </div>
      )}
    </>
  );
}
