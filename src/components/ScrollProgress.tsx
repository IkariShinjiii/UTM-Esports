"use client";

import { useEffect, useRef } from "react";

// A thin bar at the top of the window that fills as the page is scrolled (replaces the browser scrollbar).
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      ref.current?.style.setProperty("--p", String(max > 0 ? Math.min(1, el.scrollTop / max) : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="scroll-progress" role="presentation" aria-hidden="true" />;
}
