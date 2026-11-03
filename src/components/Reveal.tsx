"use client";

import { createElement, type ReactNode } from "react";
import { useReveal } from "./useReveal";

type Tag = "div" | "li" | "section" | "article" | "p" | "ul";

// A wrapper that reveals its content slowly when scrolled into view. Use `delay` (ms) to stagger a row of items.
export function Reveal({
  as = "div",
  delay = 0,
  className,
  children,
}: {
  as?: Tag;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>(delay);
  return createElement(as, { ref, className }, children);
}
