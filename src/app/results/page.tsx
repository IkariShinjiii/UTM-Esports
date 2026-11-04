import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Footer, ResultCard, h2, resultsData, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `The finish line | ${content.settings.orgName}`,
  description: "Every placing UTM Esports has earned, newest first, with each certificate or poster.",
};

export default function ResultsPage() {
  const { champions, others, summary } = resultsData();
  const grid = "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
  return (
    <>
      <Nav />
      <div id="content" className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            The finish line
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg leading-snug">Every placing we have earned, newest first.</p>
          <p className="mt-4 text-lg font-semibold">{summary}</p>
        </div>
      </div>

      <main>
        {champions.length > 0 && (
          <section
            aria-labelledby="champions-title"
            className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.1] [--gpos:100%_50%]"
          >
            <Reveal className={wrap}>
              <h2 id="champions-title" className={h2}>
                Championships
              </h2>
              <div className={grid}>
                {champions.map((r) => (
                  <ResultCard key={`${r.event}-${r.date}`} a={r} />
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {others.length > 0 && (
          <section
            aria-labelledby="others-title"
            className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.1] [--gpos:0%_50%]"
          >
            <Reveal className={wrap}>
              <h2 id="others-title" className={h2}>
                Other finishes
              </h2>
              <div className={grid}>
                {others.map((r) => (
                  <ResultCard key={`${r.event}-${r.date}`} a={r} />
                ))}
              </div>
            </Reveal>
          </section>
        )}
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
