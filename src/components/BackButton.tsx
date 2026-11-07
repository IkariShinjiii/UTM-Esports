import Link from "next/link";

// Always takes the visitor to the landing page (or the section of it that this page belongs to), not to whatever
// page they happened to visit before.
export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  return (
    <Link
      href={fallback}
      className="cut-btn inline-flex min-h-12 items-center gap-3 bg-white px-10 text-sm font-bold uppercase tracking-wide text-track transition-colors hover:bg-ink hover:text-white"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 5l-7 7 7 7" />
      </svg>
      {label}
    </Link>
  );
}
