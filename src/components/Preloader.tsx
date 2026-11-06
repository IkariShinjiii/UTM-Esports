"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MIN_MS = 1900; // the dragon breathes fire for at least this long
const FLY = 1.5; // seconds the logo takes to travel into the nav

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
      tl = gsap.timeline({ onComplete: finish });
      tl.to(fireWrap.current, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, 0)
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

  // The dragon breathes fire out of its mouth (to the left) while the page loads: a stream of glowing puffs that
  // grow, drift up and fade, each one cooling from yellow to red. All driven by GSAP.
  useEffect(() => {
    if (!hasRect || !fireWrap.current) return;
    if (document.documentElement.getAttribute("data-intro") === "skip") return;
    const wrap = fireWrap.current;
    const unit = slot.current?.getBoundingClientRect().width ?? 150; // fire scales with the logo
    const puffs = Array.from(wrap.querySelectorAll<HTMLElement>("[data-puff]"));
    const ctx = gsap.context(() => {
      gsap.set(puffs, { autoAlpha: 0, xPercent: -50, yPercent: -50, width: unit * 0.26, height: unit * 0.2 });
      puffs.forEach((el, i) => {
        // The flame leaves the open jaw heading left and a little down (the mouth opens down-left)
        const dist = unit * gsap.utils.random(0.8, 2.1);
        const life = gsap.utils.random(0.65, 1.05);
        const delay = 0.3 + (i / puffs.length) * 0.7; // the breath builds: puffs start one after another
        const angle = () => gsap.utils.random(12, 34) * (Math.PI / 180);
        gsap.fromTo(el, { x: 0, y: 0, scale: 0.4, scaleX: 0.8, filter: "hue-rotate(0deg) brightness(1.15)" }, {
          x: () => -dist * Math.cos(angle()),
          y: () => dist * 0.6 * Math.sin(angle()) - unit * gsap.utils.random(0, 0.1),
          scale: () => gsap.utils.random(1.2, 2),
          scaleX: () => gsap.utils.random(1.6, 2.6),
          filter: "hue-rotate(-24deg) brightness(0.8)",
          duration: life, ease: "none", repeat: -1, repeatRefresh: true, delay,
        });
        gsap.to(el, { keyframes: [{ autoAlpha: 1, duration: life * 0.1, ease: "none" }, { autoAlpha: 0, duration: life * 0.9, ease: "power1.in" }], repeat: -1, delay });
      });
      gsap.set(wrap.querySelector('[data-core]'), { width: unit * 0.13, height: unit * 0.13, left: 0, top: 0, xPercent: -50, yPercent: -50 });
      // a bright core at the mouth that pulses like a pilot flame
      gsap.fromTo(wrap.querySelector('[data-core]'), { scale: 0.8, autoAlpha: 0 }, { scale: 1.25, autoAlpha: 1, duration: 0.16, delay: 0.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      // a slow flicker over the whole flame
      gsap.to(wrap, { opacity: 0.88, duration: 0.14, repeat: -1, yoyo: true, ease: "none" });
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
          <span data-core className="preloader__core" />
          {Array.from({ length: 70 }, (_, i) => <span key={i} data-puff className="preloader__puff" />)}
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
