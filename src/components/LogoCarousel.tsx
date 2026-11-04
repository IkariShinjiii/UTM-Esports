"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type LogoItem =
  | { kind: "game"; id: string; name: string; logo?: string; short?: string; live: boolean }
  | { kind: "partner"; name: string; logo: string; url?: string };

const SPEED = 50; // px per second

// The bar under the hero: the games UTM plays (each opens its page), then the club's partners in white,
// drifting sideways in a loop (GSAP). Every logo has the same height and the same space on both sides, so the
// gaps are even. It slows to a stop while hovered or focused. Only the first copy is exposed to screen readers;
// the repeats just fill the loop.
export function LogoCarousel({ items }: { items: LogoItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const [stopped, setStopped] = useState(false);
  const stoppedRef = useRef(false);

  // Repeat the list so one copy is always wider than the screen, then slide by exactly one copy.
  const group = Array.from({ length: 3 }, () => items).flat();

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const build = () => {
      tween.current?.kill();
      gsap.set(el, { xPercent: 0 });
      const half = el.scrollWidth / 2;
      tween.current = gsap.to(el, { xPercent: -50, duration: Math.max(10, half / SPEED), ease: "none", repeat: -1 });
      if (stoppedRef.current) tween.current.pause();
    };
    build();
    window.addEventListener("resize", build);
    return () => {
      window.removeEventListener("resize", build);
      tween.current?.kill();
    };
  }, [items.length]);

  const slow = (to: number) => {
    if (tween.current && !stoppedRef.current) gsap.to(tween.current, { timeScale: to, duration: 0.5, ease: "power2.out", overwrite: true });
  };

  const toggle = () => {
    const next = !stoppedRef.current;
    stoppedRef.current = next;
    setStopped(next);
    if (next) tween.current?.pause();
    else {
      tween.current?.timeScale(1);
      tween.current?.play();
    }
  };

  const logoCls = "h-7 w-auto max-w-none md:h-9";

  const render = (it: LogoItem, i: number, first: boolean) => {
    if (it.kind === "partner") {
      const img = (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={it.logo} alt={first ? it.name : ""} className={logoCls} />
      );
      return (
        <li key={`p-${it.name}-${i}`} className="px-8 md:px-12">
          {it.url ? (
            <a
              href={it.url}
              target="_blank"
              rel="noopener"
              aria-label={`${it.name} (opens in a new tab)`}
              tabIndex={first ? undefined : -1}
              className="inline-flex min-h-12 items-center transition duration-150 hover:-translate-y-0.5"
            >
              {img}
            </a>
          ) : (
            img
          )}
        </li>
      );
    }
    return (
      <li key={`g-${it.id}-${i}`} className="px-8 md:px-12">
        <Link
          href={`/teams/${it.id}`}
          aria-label={it.name}
          data-track={`hero_game_${it.id}`}
          tabIndex={first ? undefined : -1}
          className={`inline-flex min-h-12 min-w-11 items-center justify-center transition duration-150 hover:-translate-y-0.5 ${it.live ? "opacity-100" : "opacity-80"} hover:opacity-100`}
        >
          {it.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.logo} alt="" className={logoCls} />
          ) : (
            <span className="font-display text-lg font-extrabold italic uppercase leading-none md:text-2xl">
              {it.short ?? it.name}
            </span>
          )}
        </Link>
      </li>
    );
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Games we play and our partners"
      className="relative overflow-hidden"
      onMouseEnter={() => slow(0)}
      onMouseLeave={() => slow(1)}
      onFocus={() => slow(0)}
      onBlur={() => slow(1)}
      onTouchStart={() => slow(0)}
      onTouchEnd={() => slow(1)}
      onTouchCancel={() => slow(1)}
    >
      <div ref={track} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1 || undefined} {...(copy === 1 ? { inert: true } : {})} className="flex shrink-0 items-center">
            {group.map((it, i) => render(it, i, copy === 0 && i < items.length))}
          </ul>
        ))}
      </div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-[linear-gradient(to_right,#16090a,transparent)] md:w-28" />
      {/* Invisible until it is reached with the keyboard: then it shows, so the loop can be stopped */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={stopped}
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:right-3 focus-visible:top-1/2 focus-visible:z-10 focus-visible:-translate-y-1/2 focus-visible:bg-white focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:font-bold focus-visible:uppercase focus-visible:tracking-wide focus-visible:text-ink"
      >
        {stopped ? "Play the logo bar" : "Pause the logo bar"}
      </button>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-[linear-gradient(to_left,#16090a,transparent)] md:w-28" />
    </div>
  );
}
