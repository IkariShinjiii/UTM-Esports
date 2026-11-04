"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import type { Faq } from "@/content/types";

// The FAQ list. Opening one question closes the others (the `name` on <details> does this in current browsers),
// and the answer slides open with GSAP. It is plain <details>, so it works with the keyboard and without
// JavaScript. Reduced motion: the answer just appears.
export function FaqList({ items }: { items: Faq[] }) {
  const root = useRef<HTMLDivElement>(null);

  function onToggle(e: React.SyntheticEvent<HTMLDetailsElement>) {
    const d = e.currentTarget;
    if (!d.open) return;
    const body = d.querySelector<HTMLElement>("[data-faq-body]");
    if (!body || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "height,opacity" });
  }

  return (
    <div ref={root} className="border-t-[3px] border-ink">
      {items.map((f) => (
        <details key={f.question} name="faq" onToggle={onToggle} className="group border-b border-ink/25">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-bold italic uppercase leading-tight marker:hidden md:text-xl [&::-webkit-details-marker]:hidden">
            {f.question}
            <span aria-hidden className="text-4xl leading-none text-track group-open:hidden">+</span>
            <span aria-hidden className="hidden text-4xl leading-none text-track group-open:inline">−</span>
          </summary>
          <div data-faq-body className="overflow-hidden">
            <p className="max-w-[60ch] text-lg leading-snug">{f.answer}</p>
            {f.link && (
              <Link href={f.link.href} className="mt-3 inline-flex min-h-11 items-center text-lg font-bold uppercase tracking-wide text-track underline decoration-2 underline-offset-8 hover:no-underline">
                {f.link.label}
              </Link>
            )}
            <div className="pb-5" />
          </div>
        </details>
      ))}
    </div>
  );
}
