"use client";

import { useRouter } from "next/navigation";
import { hasPreviousPage } from "./NavHistory";

// Goes back to the page the visitor came from on this site. When there is no earlier page of ours in this tab (a
// direct link, or a link from another site), it opens `fallback` instead, without reloading the site.
export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  const router = useRouter();
  return (
    <a
      href={fallback}
      onClick={(e) => {
        // Let "open in a new tab" and similar clicks work as normal links
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        if (hasPreviousPage()) router.back();
        else router.push(fallback);
      }}
      className="cut-btn inline-flex min-h-12 items-center gap-3 bg-white px-10 text-sm font-bold uppercase tracking-wide text-track transition-colors hover:bg-ink hover:text-white"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 5l-7 7 7 7" />
      </svg>
      {label}
    </a>
  );
}
