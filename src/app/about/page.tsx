import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Footer, btnRed, h2, wrap } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `About | ${content.settings.orgName}`,
  description: "The mission and vision of UTM Esports, and the story so far.",
};

export default function AboutPage() {
  const { about, achievements } = content;
  return (
    <>
      <Nav />
      <div className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            About us
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg leading-snug">
            {content.settings.orgName} is an independent esports organization. {content.settings.tagline}
          </p>
        </div>
      </div>

      <main>
        <section
          aria-labelledby="mission-title"
          className="tex-light slab ghost relative bg-white [--gpos:100%_50%]"
        >
          <Reveal className={`${wrap} grid gap-16 md:grid-cols-2 md:gap-20`}>
            <div>
              <h2 id="mission-title" className={h2}>
                Mission
              </h2>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">{about.mission}</p>
            </div>
            <div>
              <h2 id="vision-title" className={h2}>
                Vision
              </h2>
              <p className="mt-4 max-w-[60ch] text-lg leading-relaxed">{about.vision}</p>
            </div>
          </Reveal>
        </section>

        <section
          aria-labelledby="story-title"
          className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.12] [--gpos:100%_50%]"
        >
          <Reveal className={`${wrap} grid gap-12 md:grid-cols-2 md:gap-20`}>
            <div>
              <h2 id="story-title" className={h2}>
                Our story
              </h2>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed">{about.story}</p>
            </div>
            {achievements.length > 0 && (
              <div>
                <p className="text-lg leading-snug">
                  {achievements.length} placings so far, from Valorant to Mobile Legends to Wild Rift.
                </p>
                <Link href="/results" className={`${btnRed} mt-8`}>
                  See the finish line
                </Link>
              </div>
            )}
          </Reveal>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
