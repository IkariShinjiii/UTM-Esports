"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { Reveal } from "./Reveal";

export type TeamTile = { id: string; name: string; art?: string; pos: string; detail: string };

// The game tiles. Hover or focus one and a red panel sweeps across it from the left, behind the text and the
// character art (GSAP). When the pointer leaves, the panel sweeps off to the right. Straight edges throughout.
// The art fades into whatever is behind it, so it sits well on the black and on the red.
export function TeamGrid({ tiles }: { tiles: TeamTile[] }) {
  const panels = useRef<Record<string, HTMLElement | null>>({});

  // Park every panel off the tile, to the left (the markup already hides it, so there is no flash before the script runs)
  useLayoutEffect(() => {
    Object.values(panels.current).forEach((p) => {
      if (p) gsap.set(p, { x: 0, xPercent: -100 });
    });
  }, [tiles]);

  // The panel moves by position: in from the left, out to the right. Going back in mid-way just reverses it.
  const wipeIn = (id: string) => {
    const p = panels.current[id];
    if (!p) return;
    if ((gsap.getProperty(p, "xPercent") as number) >= 99) gsap.set(p, { xPercent: -100 }); // fully gone: restart from the left
    gsap.to(p, { xPercent: 0, duration: 0.5, ease: "power3.inOut", overwrite: true });
  };
  const wipeOut = (id: string) => {
    const p = panels.current[id];
    if (!p) return;
    gsap.to(p, { xPercent: 100, duration: 0.45, ease: "power3.inOut", overwrite: true });
  };

  return (
    <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
      {tiles.map((g, i) => {
        const wide = tiles.length % 2 === 1 && i === tiles.length - 1; // the last tile spans both columns
        return (
          <Reveal as="li" key={g.id} delay={(i % 2) * 120} className="md:[&:last-child:nth-child(odd)]:col-span-2">
            <Link
              href={`/teams/${g.id}`}
              data-track={`team_${g.id}`}
              onMouseEnter={() => wipeIn(g.id)}
              onMouseLeave={() => wipeOut(g.id)}
              onFocus={() => wipeIn(g.id)}
              onBlur={() => wipeOut(g.id)}
              className="relative block overflow-hidden bg-ink text-white"
            >
              <span
                aria-hidden
                ref={(el) => {
                  panels.current[g.id] = el;
                }}
                style={{ transform: "translateX(-100%)" }}
                className="absolute inset-0 bg-track"
              />
              {g.art && (
                <span aria-hidden className="absolute inset-y-0 -right-8 w-[calc(62%+2rem)] md:w-[calc(55%+2rem)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.art}
                    alt=""
                    loading="lazy"
                    width={900}
                    height={506}
                    style={{
                      objectPosition: g.pos,
                      maskImage: "linear-gradient(to right, transparent 0%, #000 65%)",
                      WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 65%)",
                    }}
                    className="h-full w-full object-cover"
                  />
                </span>
              )}
              <span className={`relative block min-h-36 px-7 py-5 md:px-8 ${wide ? "md:min-h-56" : "md:min-h-40"}`}>
                <span className="block max-w-[68%] font-display text-2xl font-extrabold italic uppercase leading-[1] md:text-3xl">
                  {g.name}
                </span>
                <span className="mt-2 block max-w-[68%] text-base">{g.detail}</span>
              </span>
            </Link>
          </Reveal>
        );
      })}
    </ul>
  );
}
