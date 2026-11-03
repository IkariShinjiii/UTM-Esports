"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/content/types";

const INTERVAL_MS = 3000;

// The picture shuffle. Pictures slide sideways like a swipe: they advance every 3 seconds, and a
// finger or mouse can drag them. Pictures are shown whole (the jersey graphics are never cropped), and a
// caption is written on the picture itself where the picture has none of its own. Only the first
// picture loads with the page. It pauses while hovered, focused or held, and never advances on its own
// for visitors who prefer reduced motion.
export function HeroSlides({ slides }: { slides: HeroSlide[] }) {
  const count = slides.length;
  const [pos, setPos] = useState(0); // counts up forever; pos % count is the picture shown
  const [loaded, setLoaded] = useState(1); // how many pictures have started loading
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [drag, setDrag] = useState(0); // px the picture is being dragged
  const frame = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const prevOffsets = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReduced(true);
    const id = window.setTimeout(() => setLoaded(count), 1200);
    return () => window.clearTimeout(id);
  }, [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setPos((p) => p + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  // Each picture sits one frame-width apart; the one that wraps around jumps without sliding across
  const offsets = slides.map((_, i) => {
    let o = (((i - pos) % count) + count) % count;
    if (o > count / 2) o -= count;
    return o;
  });
  const jumped = offsets.map((o, i) => Math.abs(o - (prevOffsets.current[i] ?? o)) > 1);
  useEffect(() => {
    prevOffsets.current = offsets;
  });

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
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (startX.current === null) setPaused(false);
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        ref={frame}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative aspect-video touch-pan-y select-none overflow-hidden bg-ink"
      >
        {slides.map((s, i) => (
          <div
            key={s.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            inert={i !== current}
            style={{
              transform: `translateX(calc(${offsets[i] * 100}% + ${drag}px))`,
              transition: drag !== 0 || jumped[i] || reduced ? "none" : "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="absolute inset-0"
          >
            {(i < loaded || i === current) && (
              <picture>
                {s.mobileImage && <source media="(max-width: 767px)" srcSet={s.mobileImage} />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
        <ul className="mt-2 flex items-center">
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
                className="grid h-11 w-9 place-items-center"
              >
                <span className={`block h-1.5 transition-all ${i === current ? "w-7 bg-white" : "w-4 bg-white/50"}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
