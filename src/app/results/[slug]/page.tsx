import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { SkelImg } from "@/components/SkelImg";
import { Footer, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";
import { resultSlug } from "@/content/slug";

export const dynamicParams = false;

const withImage = content.achievements.filter((a) => a.image);

export function generateStaticParams() {
  return withImage.map((a) => ({ slug: resultSlug(a) }));
}

const dateFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = withImage.find((x) => resultSlug(x) === slug);
  return { title: a ? `${a.placement}: ${a.event} | ${content.settings.orgName}` : content.settings.orgName };
}

// One result on its own page: the full poster or certificate, never cropped, with a Back button.
export default async function ResultPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = withImage.find((x) => resultSlug(x) === slug);
  if (!a || !a.image) notFound();
  const champion = a.placement === "Champion";
  const meta = [a.game ? content.games[a.game] ?? a.game : null, dateFmt.format(new Date(a.date))]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Nav />
      <main className="on-dark tex-dark relative bg-ink pb-24 pt-10 text-white md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/results" />
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <span
              className={`block px-5 py-1.5 font-display text-xl font-extrabold italic uppercase leading-none ${champion ? "bg-track text-white" : "bg-white text-ink"}`}
            >
              {a.placement}
            </span>
            <span className="text-lg">{meta}</span>
          </div>
          <h1 className="mt-4 max-w-[30ch] font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            {a.event}
          </h1>
          {(a.team || a.note) && (
            <p className="mt-4 text-lg text-white/80">{[a.team, a.note].filter(Boolean).join(". ")}</p>
          )}

          <SkelImg
            src={a.image}
            alt={a.imageAlt ?? a.event}
            width={1000}
            height={1000}
            className="mx-auto mt-10 h-auto max-h-[80vh] w-auto max-w-full bg-well"
          />
        </div>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
