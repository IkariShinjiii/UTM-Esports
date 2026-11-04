import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { MerchPhoto } from "@/components/MerchCard";
import { Footer, btnInk, h2, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const metadata: Metadata = {
  title: `Merch | ${content.settings.orgName}`,
  description: "UTM Esports jerseys: Crimson Cloudburst and Sakura Blossom.",
};

const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

export default function MerchPage() {
  const { merch, settings } = content;
  return (
    <>
      <Nav />
      <div id="content" className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:90%_50%] md:pt-14">
        <div className={wrap}>
          <BackButton fallback="/" />
          <h1 className="mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]">
            Merch
          </h1>
          <p className="mt-4 max-w-[40ch] text-lg leading-snug">The club jerseys. Hover a jersey to see the back.</p>
        </div>
      </div>

      <main>
        <section
          aria-labelledby="merch-title"
          className="on-dark tex-dark slab ghost relative bg-ink text-white [--gop:0.12] [--gpos:100%_50%]"
        >
          <Reveal className={wrap}>
            <h2 id="merch-title" className="sr-only">
              Jerseys
            </h2>
            {merch.length === 0 ? (
              <p className="text-lg">Merch is coming soon.</p>
            ) : (
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-32 pt-24">
                {merch.map((m) => (
                  <li key={m.name} className="relative w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                    <MerchPhoto m={m} />
                    <div className="bg-white px-6 pb-8 pt-28 text-center text-ink">
                      <h3 className={`${h2} !text-[clamp(1.25rem,2vw,1.625rem)]`}>{m.name}</h3>
                      <p className="mt-3 text-lg font-semibold">
                        {m.price !== undefined ? peso.format(m.price) : "Price coming soon"}
                      </p>
                      <a
                        href={m.orderUrl ?? settings.discordInvite}
                        data-track="merch_order"
                        className={`${btnInk} mt-6`}
                      >
                        {m.orderUrl ? "Order" : "Ask on Discord"}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
