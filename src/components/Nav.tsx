"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { content } from "@/content/site";

// Five places in the bar, in the order they appear on the page from top to bottom: four links and a "More"
// menu that holds the rest (also in page order, then the pages that are not on the home page).
const MAIN = [
  ["Results", "/#results"],
  ["Teams", "/#teams"],
  ["Events", "/#events"],
  ["Highlights", "/#highlights"],
] as const;
const MORE = [
  ["Community", "/#community"],
  ["Partners", "/#partners"],
  ["FAQ", "/#faq"],
  ["Merch", "/merch"],
  ["Our CEO", "/ceo"],
  ["Organization", "/organization"],
  ["About", "/about"],
] as const;
const ALL = [...MAIN, ...MORE];

// Home page sections in page order, so the nav can show which one is on screen.
// "squad" (the picture shuffle) has no link of its own, so nothing is marked while it is on screen.
const SECTIONS = ["results", "join", "teams", "events", "squad", "highlights", "community", "partners", "faq"];

// The nav bar: stays at the top of the screen. Links and a More menu on large screens, a menu button on phones.
export function Nav() {
  const { settings } = content;
  const [open, setOpen] = useState(false); // phone menu
  const [more, setMore] = useState(false); // the More dropdown
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const moreWrap = useRef<HTMLDivElement>(null);
  const morePanel = useRef<HTMLUListElement>(null);
  const moreBtn = useRef<HTMLButtonElement>(null);

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

  // The More menu: opens with a short GSAP drop, closes on Escape, on a click outside, or when focus leaves it.
  useEffect(() => {
    if (!more) return;
    const panel = morePanel.current;
    if (panel) {
      gsap.fromTo(panel, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" });
      gsap.fromTo(panel.children, { opacity: 0, x: -8 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.045, ease: "power2.out", delay: 0.05 });
    }
    const onDoc = (e: MouseEvent) => {
      if (!moreWrap.current?.contains(e.target as Node)) setMore(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMore(false);
        moreBtn.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [more]);

  const isActive = (href: string) =>
    href.startsWith("/#") ? pathname === "/" && href === `/#${section}` : pathname === href;
  const moreActive = MORE.some(([, href]) => isActive(href));

  const linkCls = (active: boolean) =>
    `border-b-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors hover:border-white/60 ${
      active ? "border-track text-white" : "border-transparent text-white/80 hover:text-white"
    }`;

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

        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {MAIN.map(([label, href]) => (
            <a key={href} href={href} aria-current={isActive(href) ? "location" : undefined} className={linkCls(isActive(href))}>
              {label}
            </a>
          ))}
          <div
            ref={moreWrap}
            className="relative"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setMore(false);
            }}
          >
            <button
              ref={moreBtn}
              type="button"
              onClick={() => setMore((v) => !v)}
              aria-expanded={more}
              aria-controls="more-menu"
              className={`inline-flex items-center gap-2 ${linkCls(moreActive || more)} ${more ? "!text-white" : ""}`}
            >
              More
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className={`size-4 transition-transform duration-200 ${more ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {more && (
              <ul
                id="more-menu"
                ref={morePanel}
                className="absolute right-0 top-full z-50 mt-3 w-56 border-t-4 border-track bg-white py-2 text-ink shadow-[0_18px_40px_rgb(0_0_0/0.35)]"
              >
                {MORE.map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => setMore(false)}
                      aria-current={isActive(href) ? "location" : undefined}
                      className={`block px-6 py-3 text-lg font-semibold leading-none transition-colors hover:bg-blush hover:text-track ${
                        isActive(href) ? "text-track" : ""
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <a
            href={settings.discordInvite}
            data-track="discord_nav"
            className="inline-flex min-h-11 items-center text-sm font-bold uppercase tracking-wide underline decoration-2 underline-offset-8 hover:no-underline"
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
            {ALL.map(([label, href]) => (
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
