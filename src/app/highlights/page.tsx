import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Footer, Mosaic, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `Highlights | ${content.settings.orgName}`,
  description: "Photos from UTM Esports: tournament days, kit days and the squad together.",
};

export default function HighlightsPage() {
  // Every photo, newest first. Photos with no date go last, in the order they are listed.
  const all = [...content.moments, ...content.moreMoments]
    .map((m, i) => ({ m, i }))
    .sort((a, b) => (b.m.date ?? "").localeCompare(a.m.date ?? "") || a.i - b.i)
    .map(({ m }) => m);
  return (
    <>
      <Nav />
      <div id="content" className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/#highlights" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            Highlights
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg leading-snug">{all.length} photos from the club, newest first.</p>
        </div>
      </div>

      <main>
        <section
          aria-label="Photos"
          className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.12] [--gpos:100%_50%]"
        >
          <Reveal className={wrap}>
            <Mosaic items={all} />
          </Reveal>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
