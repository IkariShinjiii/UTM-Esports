"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { content } from "@/content/site";

const NAV = [
  ["Teams", "/#teams"],
  ["Results", "/#results"],
  ["Events", "/#events"],
  ["Highlights", "/#highlights"],
  ["Community", "/#community"],
  ["Partners", "/#partners"],
  ["FAQ", "/#faq"],
  ["About", "/about"],
] as const;

// Home page sections in page order, so the nav can show which one is on screen.
const SECTIONS = ["results", "join", "teams", "events", "highlights", "community", "partners", "faq"];

// The nav bar: stays at the top of the screen. Links on large screens, a menu button on phones.
export function Nav() {
  const { settings } = content;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);

  // Scroll-spy: the current section is the last one whose top has passed just under the nav bar.
  useEffect(() => {
    if (pathname !== "/") {
      setSection(null);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) current = id;
      }
      // at the very bottom the last section can never reach the top, so it counts as current
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = SECTIONS[SECTIONS.length - 1];
      setSection(current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/about" ? pathname === "/about" : pathname === "/" && href === `/#${section}`;

  return (
    <header className="on-dark sticky top-0 z-50 border-b-[3px] border-track bg-ink text-white">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 py-3 md:px-12">
        <Link href="/" aria-label="UTM Esports, home" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/utm-logo-white.png"
            alt="UTM Esports"
            width={900}
            height={813}
            className="h-12 w-auto"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              aria-current={isActive(href) ? "location" : undefined}
              className={`border-b-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:border-white/60 ${
                isActive(href) ? "border-track text-white" : "border-transparent text-white/80 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <a
            href={settings.discordInvite}
            data-track="discord_nav"
            className="text-sm font-bold uppercase tracking-wide underline decoration-2 underline-offset-8 hover:no-underline"
          >
            Discord
          </a>
          {settings.recruitingOpen && (
            <a
              href={settings.applyFormUrl}
              data-track="apply_nav"
              className="cut-btn inline-flex min-h-12 items-center bg-track px-10 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-track"
            >
              Join the squad
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close the menu" : "Open the menu"}
          className="grid size-12 place-items-center border-2 border-white/40 transition-colors hover:border-white xl:hidden"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-white/20 px-6 pb-6 pt-2 xl:hidden">
          <ul>
            {NAV.map(([label, href]) => (
              <li key={href} className="border-b border-white/20">
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "location" : undefined}
                  className={`block py-3 font-display text-2xl font-extrabold italic uppercase leading-none ${isActive(href) ? "text-track" : ""}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            {settings.recruitingOpen && (
              <a
                href={settings.applyFormUrl}
                data-track="apply_menu"
                className="cut-btn inline-flex min-h-14 items-center bg-white px-14 text-lg font-bold uppercase tracking-wide text-track"
              >
                Join the squad
              </a>
            )}
            <a
              href={settings.discordInvite}
              data-track="discord_menu"
              className="text-lg font-bold uppercase tracking-wide underline decoration-2 underline-offset-8"
            >
              Join our Discord
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
