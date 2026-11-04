"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Remembers the pages the visitor has opened on this site, in this tab, so the Back button knows whether there is
// a page of ours to go back to. (document.referrer cannot tell: it only describes how the first page was reached.)
// A page opened by a link adds to the list; the browser's own Back button takes pages off it.
const KEY = "utm-nav-stack";

function read(): string[] {
  try {
    const v = JSON.parse(window.sessionStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** True when the visitor has opened another page of this site before this one in this tab. A tab opened from a
 *  link can inherit the list but has no history of its own, so the browser's history length counts too. */
export function hasPreviousPage(): boolean {
  return read().length > 1 && window.history.length > 1;
}

export function NavHistory() {
  const pathname = usePathname();
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const stack = read();
    if (stack[stack.length - 1] === pathname) return; // first load, or the same page again
    if (popped.current) {
      // Went back (or forward) with the browser: drop everything after the page we are now on
      popped.current = false;
      const i = stack.lastIndexOf(pathname);
      if (i >= 0) stack.length = i + 1;
      else stack.push(pathname);
    } else {
      stack.push(pathname);
    }
    try {
      window.sessionStorage.setItem(KEY, JSON.stringify(stack.slice(-30)));
    } catch {}
  }, [pathname]);

  return null;
}
