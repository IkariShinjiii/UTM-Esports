"use client";

import { useRouter } from "next/navigation";

// Goes back to the page the visitor came from. With no history (a direct link), it opens `fallback` instead.
export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  const router = useRouter();
  return (
    <a
      href={fallback}
      onClick={(e) => {
        if (window.history.length > 1 && document.referrer.startsWith(window.location.origin)) {
          e.preventDefault();
          router.back();
        }
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
