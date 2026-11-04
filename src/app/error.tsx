"use client";

import Link from "next/link";
import { useEffect } from "react";
import { btnWhite, linkOnDark, wrap } from "@/components/Sections";

// Shown when a page hits an unexpected error. It does not use the nav or footer, so a problem in them cannot
// break this page too.
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="on-dark field tex-red relative flex min-h-svh flex-col justify-center overflow-hidden py-16 text-white">
      <div className={`${wrap} relative z-10 w-full`}>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
          Something went wrong.
        </h1>
        <p className="mt-5 max-w-[34ch] text-lg leading-snug md:text-xl">
          This page hit a problem. Try again, or head back home.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button type="button" onClick={reset} className={btnWhite}>
            Try again
          </button>
          <Link href="/" className={linkOnDark}>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
