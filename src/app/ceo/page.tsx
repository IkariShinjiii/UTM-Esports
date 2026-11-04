import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SkelImg } from "@/components/SkelImg";
import { Footer, btnInk, h2, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `Our CEO | ${content.settings.orgName}`,
  description: `Meet ${content.ceo.name}, ${content.ceo.title}.`,
};

export default function CeoPage() {
  const { ceo } = content;
  return (
    <>
      <Nav />
      <div className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            Our CEO
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg leading-snug">{content.settings.tagline}</p>
        </div>
      </div>

      <main>
        <section aria-labelledby="ceo-name" className="tex-light slab ghost relative bg-white [--gpos:100%_50%]">
          <Reveal className={`${wrap} grid items-start gap-12 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-20`}>
            {/* The whole photo, never cropped */}
            <SkelImg
              src={ceo.photo}
              alt={ceo.photoAlt}
              width={900}
              height={1350}
              className="h-auto w-full max-w-sm bg-ink md:max-w-none"
            />
            <div>
              <h2 id="ceo-name" className={h2}>
                {ceo.name}
              </h2>
              <p className="mt-4 text-lg font-semibold leading-snug text-track">{ceo.title}</p>
              {ceo.intro && <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">{ceo.intro}</p>}
              {ceo.message && (
                <blockquote className="mt-8 max-w-[52ch] border-l-4 border-track pl-6 text-lg leading-relaxed">
                  {ceo.message.map((p) => (
                    <p key={p} className="[&:not(:first-child)]:mt-4">
                      {p}
                    </p>
                  ))}
                </blockquote>
              )}
              {ceo.motto && (
                <p className="mt-8 max-w-[30ch] font-display text-2xl font-extrabold italic uppercase leading-tight md:text-3xl">
                  {ceo.motto}
                </p>
              )}
              <Link href="/about" data-track="ceo_about" className={`${btnInk} mt-8`}>
                Mission and vision
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
