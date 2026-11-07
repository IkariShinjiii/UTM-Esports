"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MIN_MS = 2200; // the intro shows for at least this long
const FLY = 1.5; // seconds the logo takes to travel into the nav

export const INTRO_KEY = "utm-intro-seen";

// Runs in <head>-adjacent markup before React: marks the page as loading (so the hero holds its entrance and the
// nav logo stays hidden) unless this visit has already seen the intro or the visitor prefers reduced motion.
export const introGuard = `try{var d=document.documentElement,p=new URLSearchParams(location.search).has("intro"),s=sessionStorage.getItem("${INTRO_KEY}")==="1",r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(p||(!s&&!r)){d.classList.add("is-loading","logo-pending")}else{d.setAttribute("data-intro","skip")}}catch(e){}`;

// The first-visit intro: a dark screen with the logo (it rises in and a light sweeps across it) and a flat red
// loading bar. Then the logo flies up into its place in the nav while the screen lifts away. It plays once per
// visit (add ?intro to the address to see it again) and is skipped for reduced motion.
export function Preloader() {
  const [status, setStatus] = useState<"run" | "done">("run");
  const [rect, setRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const screen = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const fly = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

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
      // the bar finishes and clears as the logo sets off
      tl.to(bar.current, { autoAlpha: 0, duration: 0.25, ease: "none" }, 0)
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

  // The loading bar fills under the logo while the page loads
  useEffect(() => {
    if (!rect || !bar.current) return;
    if (document.documentElement.getAttribute("data-intro") === "skip") return;
    const fill = bar.current.querySelector("[data-fill]");
    const tween = gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut", delay: 0.35 });
    return () => { tween.kill(); };
  }, [rect !== null]); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "done") return null;
  return (
    <>
      <div ref={screen} className="preloader" role="status" aria-label="Loading UTM Esports">
        <div className="text-center">
          <div ref={slot} className="mx-auto" style={{ width: "clamp(6.5rem, 20vw, 9.5rem)", aspectRatio: "360 / 325" }} />
          <div ref={bar} aria-hidden="true" className="preloader__bar">
            <div data-fill className="preloader__fill" />
          </div>
        </div>
      </div>
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
