import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { OrgChart } from "@/components/OrgChart";
import { Reveal } from "@/components/Reveal";
import { Footer, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `Organization chart | ${content.settings.orgName}`,
  description: "How UTM Esports is organized: the CEO, the admins, the groups that support the club, and the first team.",
};

export default function OrganizationPage() {
  return (
    <>
      <Nav />
      <div className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            Organization chart
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg leading-snug">How {content.settings.orgName} is organized, from the top down.</p>
        </div>
      </div>

      <main>
        <section
          aria-label="Organization chart"
          className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.12] [--gpos:100%_50%]"
        >
          <Reveal className={wrap}>
            <OrgChart />
          </Reveal>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
