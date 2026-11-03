"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DRAGON_INNER, DRAGON_OUTER } from "./dragonPath";

gsap.registerPlugin(MotionPathPlugin);

// Flame trail. On a black screen a white-hot spark flies around the dragon's outline, leaving a glowing red
// trail behind it. The inner cut-outs draw in, the dragon fills white, a red flood opens from its eye and
// the page appears (about 4.4 s). Plays once per visit (add ?pre=1 to the address to see it again). It runs
// for everyone, reduced motion included, because it is short and only plays once. Repeat visits skip it
// (an inline script in the layout hides it before first paint), and it removes itself after 9 s whatever happens.
const KEY = "utm-pre-seen";
const EYE = { x: 0.331, y: 0.58 }; // the dark slit of the eye, as a share of the logo image

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const flood = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const box = stage.current;
    const red = flood.current;
    if (!el || !box || !red) return;
    const done = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      el.remove();
    };
    if (document.documentElement.hasAttribute("data-pre-skip")) {
      done();
      return;
    }

    // Where the eye sits on screen, and how far the red must spread to cover every corner.
    const r = box.getBoundingClientRect();
    const ex = r.left + r.width * EYE.x;
    const ey = r.top + r.height * EYE.y;
    const reach = Math.hypot(Math.max(ex, innerWidth - ex), Math.max(ey, innerHeight - ey)) * 1.05;
    red.style.clipPath = `circle(var(--r, 0px) at ${ex}px ${ey}px)`;

    const safety = window.setTimeout(done, 9000);
    const tl = gsap.timeline({
      onComplete: () => {
        window.clearTimeout(safety);
        done();
      },
    });
    tl.set(".pre-spark", { opacity: 1 }, 0.3)
      .to(".pre-spark", { duration: 2.3, ease: "power1.inOut", motionPath: { path: ".pre-outer", align: ".pre-outer", alignOrigin: [0.5, 0.5] } }, 0.3)
      .fromTo(".pre-outer", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.3, ease: "power1.inOut" }, 0.3)
      .to(".pre-spark", { opacity: 0, scale: 0, transformOrigin: "50% 50%", duration: 0.25 }, 2.55)
      .fromTo(".pre-inner", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: "power1.out" }, 2.4)
      .to(".pre-fill", { opacity: 1, duration: 0.5, ease: "power1.inOut" }, 2.9)
      .to(".pre-lines", { opacity: 0, duration: 0.4 }, 3.1)
      .fromTo(".pre-eye", { scale: 0 }, { scale: 1.4, duration: 0.35, ease: "back.out(2.5)" }, 3.2)
      .fromTo(red, { "--r": "0px" }, { "--r": `${reach}px`, duration: 0.7, ease: "power2.in" }, 3.5)
      .to(el, { opacity: 0, duration: 0.5, ease: "power1.out" }, 4.0);
    return () => {
      window.clearTimeout(safety);
      tl.kill();
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="pre-root fixed inset-0 z-[100] flex items-center justify-center bg-ink">
      <div ref={stage} className="relative aspect-[791/629] w-[min(80vw,520px)]">
        <span className="pre-fill absolute inset-0 bg-[url('/images/dragon-white.webp')] bg-contain bg-center bg-no-repeat opacity-0" />
        <svg
          aria-hidden
          viewBox="0 0 791 629"
          className="pre-lines absolute inset-0 size-full overflow-visible"
          fill="none"
          style={{ filter: "drop-shadow(0 0 5px rgba(212,35,43,0.9))" }}
        >
          <path
            className="pre-inner"
            d={DRAGON_INNER}
            pathLength={1}
            stroke="#d4232b"
            strokeWidth={3}
            strokeLinejoin="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <path
            className="pre-outer"
            d={DRAGON_OUTER}
            pathLength={1}
            stroke="#d4232b"
            strokeWidth={4}
            strokeLinejoin="round"
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <circle className="pre-spark" r={11} fill="#fff" opacity={0} style={{ filter: "drop-shadow(0 0 10px #fff)" }} />
        </svg>
        <span
          className="pre-eye absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-track shadow-[0_0_24px_10px_rgba(212,35,43,0.7)]"
          style={{ left: `${EYE.x * 100}%`, top: `${EYE.y * 100}%`, scale: 0 }}
        />
      </div>
      <div ref={flood} className="absolute inset-0 bg-track" style={{ clipPath: "circle(0px at 50% 50%)" }} />
      <noscript>
        <style>{".pre-root{display:none}"}</style>
      </noscript>
    </div>
  );
}
