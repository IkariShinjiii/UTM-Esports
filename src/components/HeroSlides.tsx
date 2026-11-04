"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import type { HeroSlide } from "@/content/types";

const INTERVAL_MS = 3000;

// The picture shuffle. Pictures swipe sideways (GSAP): they advance every 3 seconds, and a finger or mouse
// can drag them. While a picture slides, its photo glides a little slower than its frame, so the swipe has
// depth. Pictures are shown whole (the jersey graphics are never cropped), and a caption is written on the
// picture itself where the picture has none of its own. Only the first picture loads with the page; the
// next one starts loading once the page has finished loading, and the rest load one step ahead as the
// shuffle advances. It keeps swiping by itself; it only holds still while a finger or the keyboard is on it.
export function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [pos, setPos] = useState(0); // counts up forever; pos % count is the picture shown
  const [loaded, setLoaded] = useState(1); // how many pictures have been asked to load, in order
  const [paused, setPaused] = useState(false); // a finger or the keyboard is on it: temporary
  const [stopped, setStopped] = useState(false); // chosen with the keyboard-only Pause button
  const [drag, setDrag] = useState(0); // px the picture is being dragged
  const frame = useRef<HTMLDivElement>(null);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const photoEls = useRef<(HTMLDivElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const prevOffsets = useRef<number[] | null>(null);
  const [reduced, setReduced] = useState(false); // the visitor asked for reduced motion

  useEffect(() => {
    // Keep the second picture out of the page's first load
    const warm = () => setLoaded((l) => Math.max(l, 2));
    // Visitors who ask for reduced motion get a still picture they can step through with the dots
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStopped(true);
      setReduced(true);
    }
    if (document.readyState === "complete") warm();
    else window.addEventListener("load", warm, { once: true });
    return () => window.removeEventListener("load", warm);
  }, []);

  useEffect(() => {
    if (paused || stopped || count < 2) return;
    const id = window.setInterval(() => setPos((p) => p + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, stopped, count]);

  // Pictures below this index may load: just the first until the page has loaded, then always one ahead
  const ready = Math.min(count, Math.max(loaded, pos > 0 ? pos + 2 : 1));

  // Each picture sits one frame-width apart; the one that wraps around jumps without sliding across
  const offsets = slides.map((_, i) => {
    let o = (((i - pos) % count) + count) % count;
    if (o > count / 2) o -= count;
    return o;
  });

  // Slide every picture to its place. The frame and the photo inside it move at different speeds.
  useLayoutEffect(() => {
    const prev = prevOffsets.current;
    offsets.forEach((o, i) => {
      const slide = slideEls.current[i];
      const photo = photoEls.current[i];
      if (!slide || !photo) return;
      const jumped = prev === null || Math.abs(o - (prev[i] ?? o)) > 1;
      const still = drag !== 0 || jumped || reduced;
      gsap.to(slide, { xPercent: o * 100, x: drag, duration: still ? 0 : 0.95, ease: "power3.inOut", overwrite: "auto" });
      gsap.to(photo, { xPercent: -o * 8, duration: still ? 0 : 0.95, ease: "power3.inOut", overwrite: "auto" });
    });
    prevOffsets.current = offsets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, drag, count, reduced]);

  const current = ((pos % count) + count) % count;

  function onDown(e: React.PointerEvent) {
    startX.current = e.clientX;
    setPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onMove(e: React.PointerEvent) {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  }
  function onUp(e: React.PointerEvent) {
    if (startX.current === null) return;
    const width = frame.current?.offsetWidth ?? 1;
    const dx = e.clientX - startX.current;
    startX.current = null;
    setDrag(0);
    setPaused(false);
    setLoaded(count);
    if (Math.abs(dx) > Math.min(60, width * 0.15)) setPos((p) => p + (dx < 0 ? 1 : -1));
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="UTM Esports highlights"
      onFocus={(e) => {
        if (e.target.matches(":focus-visible")) setPaused(true);
      }}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={frame}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        aria-live="off"
        className="relative aspect-video touch-pan-y select-none overflow-hidden bg-ink"
      >
        {slides.map((s, i) => (
          <div
            key={s.image}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            inert={i !== current}
            // before the script runs, the pictures already sit in their places (GSAP takes over from here)
            style={{ transform: `translateX(${offsets[i] * 100}%)` }}
            className="absolute inset-0 overflow-hidden"
          >
            <div
              ref={(el) => {
                photoEls.current[i] = el;
              }}
              className="absolute inset-0"
            >
              {(i < ready || i === current) && (
                <picture>
                  {s.mobileImage && <source media="(max-width: 767px)" srcSet={s.mobileImage} />}
                  <img
                    src={s.image}
                    alt={s.alt}
                    width={1920}
                    height={1080}
                    draggable={false}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    style={
                      {
                        "--pm": s.positionMobile ?? "50% 50%",
                        "--pd": s.positionDesktop ?? "50% 50%",
                      } as React.CSSProperties
                    }
                    className="h-full w-full object-cover [object-position:var(--pm)] md:[object-position:var(--pd)]"
                  />
                </picture>
              )}
            </div>
            {/* The caption is written on the picture, over a soft dark fade at the bottom */}
            {s.showCaption !== false && (
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(22_9_10/0.88)_0%,rgb(22_9_10/0.55)_55%,rgb(22_9_10/0)_100%)] px-4 pb-4 pt-12 text-white md:px-7 md:pb-6 md:pt-16">
                <p className="font-display text-base font-bold italic uppercase leading-tight md:text-xl">
                  {s.title}
                </p>
                {s.caption && <p className="mt-1 text-sm leading-snug md:text-base">{s.caption}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-2 flex items-center">
          <ul className="flex items-center">
            {slides.map((s, i) => (
              <li key={s.image}>
                <button
                  type="button"
                  onClick={() => {
                    setLoaded(count);
                    setPos((p) => p + (((i - current) % count) + count) % count);
                  }}
                  aria-label={`Show picture ${i + 1}: ${s.title}`}
                  aria-current={i === current}
                  className="grid h-11 w-11 place-items-center"
                >
                  <span className={`block h-1.5 transition-all ${i === current ? "w-7 bg-white" : "w-4 bg-white/50"}`} />
                </button>
              </li>
            ))}
          </ul>
          {/* Invisible until it is reached with the keyboard: then it shows, so the shuffle can be stopped */}
          <button
            type="button"
            onClick={() => setStopped((v) => !v)}
            aria-pressed={stopped}
            data-track="hero_shuffle_toggle"
            className="sr-only focus-visible:not-sr-only focus-visible:ml-3 focus-visible:grid focus-visible:h-11 focus-visible:place-items-center focus-visible:border-2 focus-visible:border-white focus-visible:px-4 focus-visible:text-sm focus-visible:font-bold focus-visible:uppercase focus-visible:tracking-wide"
          >
            {stopped ? "Play the picture shuffle" : "Pause the picture shuffle"}
          </button>
        </div>
      )}
    </div>
  );
}
