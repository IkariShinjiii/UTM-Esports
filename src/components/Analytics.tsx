"use client";

import { track } from "@vercel/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useEffect } from "react";

// Visitor analytics (Vercel Web Analytics: no cookies, no personal data) plus click tracking.
//
// Every button or link that carries a data-track="name" attribute reports a click event with that name and the
// page it was on. Nothing else is sent: no text, no addresses, no form contents. Page views are counted by
// <VercelAnalytics />. In development nothing is sent. To see the numbers, turn on Web Analytics for the
// project in the Vercel dashboard (Analytics tab); custom events need a plan that includes them.
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track");
      if (name) track(name, { path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return <VercelAnalytics />;
}
