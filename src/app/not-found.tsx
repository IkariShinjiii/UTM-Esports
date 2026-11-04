import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer, btnWhite, linkOnDark, wrap } from "@/components/Sections";
import { SocialIcon } from "@/components/SocialIcon";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found | ${content.settings.orgName}`,
  robots: { index: false },
};

// The page for a link that goes nowhere: the same red field and dragon as the hero, one line of help and the
// way back. (Shown for any unknown address; Vercel serves it as 404.html.)
export default function NotFound() {
  const { settings } = content;
  return (
    <>
      <Nav />
      <main
        className="on-dark field tex-red relative flex min-h-[calc(100svh-4.75rem)] flex-col justify-center overflow-hidden pb-[calc(var(--rise)+3rem)] pt-12 text-white"
      >
        {/* The mark is decoration */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/dragon-ink.webp"
          alt=""
          aria-hidden
          width={791}
          height={629}
          className="pointer-events-none absolute bottom-0 right-0 w-[150%] max-w-none translate-x-[45%] translate-y-[10%] opacity-90 md:bottom-auto md:right-[-6%] md:top-1/2 md:h-[96%] md:w-auto md:translate-x-0 md:-translate-y-1/2"
        />
        <div className={`${wrap} relative z-10`}>
          <p aria-hidden className="font-display text-[clamp(5rem,18vw,11rem)] font-extrabold italic leading-[0.85] tracking-[-0.03em] text-white/25">
            404
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            Page not found.
          </h1>
          <p className="mt-5 max-w-[34ch] text-lg leading-snug md:text-xl">
            The link may be old, or the page has moved. Head back home, or ask us on Discord.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/" className={btnWhite}>
              Back to home
            </Link>
            <a href={settings.discordInvite} className={`inline-flex items-center gap-3 ${linkOnDark}`}>
              <SocialIcon name="discord" className="size-6" />
              Discord
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
