"use client";

import { useLayoutEffect, useRef } from "react";

// Slowly reveals an element the first time it scrolls into view.
// - Anything already on screen when the page loads is left alone, so nothing flashes.
// - Without JavaScript nothing is ever hidden (the hidden state is only added here).
// - Visitors who ask for reduced motion get a gentle fade without the upward drift (see .reveal in globals.css).
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", `${delay}ms`);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}
