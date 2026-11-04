"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { content } from "@/content/site";
import { SocialIcon } from "./SocialIcon";
import type { OrgGroup } from "@/content/types";

// One box of the chart: a title, then the people in it
function Box({ g, top = false, className = "" }: { g: OrgGroup; top?: boolean; className?: string }) {
  return (
    <div data-org-box className={`mx-auto w-full max-w-sm bg-card text-white ${className}`}>
      <div className={`px-5 py-4 text-center ${top ? "bg-track" : "border-b border-white/20"}`}>
        <h2 className="font-display text-xl font-extrabold italic uppercase leading-tight">{g.title}</h2>
        {g.subtitle && <p className="mt-1 text-base font-semibold">{g.subtitle}</p>}
      </div>
      <ul className="space-y-1 px-5 py-4 text-center text-lg">
        {g.names.map((p) => {
          const name = typeof p === "string" ? p : p.name;
          const tiktok = typeof p === "string" ? undefined : p.tiktok;
          return (
            <li key={name} className="flex items-center justify-center gap-2">
              {name}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${name} on TikTok (opens in a new tab)`}
                  data-track="org_tiktok"
                  className="grid size-11 place-items-center transition-colors hover:text-track"
                >
                  <SocialIcon name="tiktok" className="size-6" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A small level name in the left margin (large screens)
function Level({ children }: { children: string }) {
  return (
    <span aria-hidden data-org-level className="absolute left-0 top-4 hidden w-28 text-base font-semibold text-white/60 md:block">
      {children}
    </span>
  );
}

// The org chart, top to bottom: CEO, admins, the three groups side by side, then the first team.
// The lines draw themselves downward the first time the chart scrolls into view (GSAP). Visitors who ask for
// reduced motion get the finished chart at once. The names come from `org` in the content file.
export function OrgChart() {
  const { org } = content;
  const root = useRef<HTMLDivElement>(null);

  // Hide the lines and boxes before the first paint (only when there will be an animation)
  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.set(el.querySelectorAll("[data-org-v]"), { scaleY: 0, transformOrigin: "50% 0%" });
    gsap.set(el.querySelectorAll("[data-org-h]"), { scaleX: 0, transformOrigin: "50% 50%" });
    gsap.set(el.querySelectorAll("[data-org-box]"), { opacity: 0, y: 16 });
    gsap.set(el.querySelectorAll("[data-org-level]"), { opacity: 0 });
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const q = (s: string) => el.querySelectorAll(s);
    const play = () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      const boxes = q("[data-org-box]");
      tl.to(q("[data-org-level]"), { opacity: 1, duration: 0.5, stagger: 0.15 }, 0)
        .to(boxes[0], { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(q("[data-org-v='1']"), { scaleY: 1, duration: 0.35 }, 0.45)
        .to(boxes[1], { opacity: 1, y: 0, duration: 0.5 }, 0.75)
        .to(q("[data-org-v='2']"), { scaleY: 1, duration: 0.35 }, 1.15)
        .to(q("[data-org-h]"), { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, 1.45)
        .to(q("[data-org-v='3']"), { scaleY: 1, duration: 0.3, stagger: 0.08 }, 1.95)
        .to([boxes[2], boxes[3], boxes[4]], { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, 2.25)
        .to(boxes[5], { opacity: 1, y: 0, duration: 0.5 }, 2.9);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          play();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const line = "mx-auto block bg-white/40";
  return (
    <div ref={root} className="md:pl-32">
      <div className="relative">
        <Level>Leadership</Level>
        <Box g={org.top} top />
      </div>
      <span aria-hidden data-org-v="1" className={`${line} h-8 w-[3px]`} />
      <div className="relative">
        <Level>Admin</Level>
        <Box g={org.second} />
      </div>
      <span aria-hidden data-org-v="2" className={`${line} h-8 w-[3px]`} />
      <div className="relative md:pt-8">
        <span aria-hidden data-org-level className="absolute left-0 top-12 hidden w-28 text-base font-semibold text-white/60 md:block">Support</span>
        {/* the bar that joins the three groups (large screens): from the middle of the first box to the middle of the last */}
        <span
          aria-hidden
          data-org-h
          className="absolute left-[calc((100%-4rem)/6)] right-[calc((100%-4rem)/6)] top-0 hidden h-[3px] bg-white/40 md:block"
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {org.third.map((g) => (
            <div key={g.title} className="relative">
              <span
                aria-hidden
                data-org-v="3"
                className="absolute -top-8 left-[calc(50%-1.5px)] hidden h-8 w-[3px] bg-white/40 md:block"
              />
              <Box g={g} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-16 border-t border-white/20 pt-10">
        <Level>Teams</Level>
        <Box g={org.division} />
      </div>
    </div>
  );
}
