import { content } from "@/content/site";
import { dragonHead, dragonStrips, type DragonPiece } from "./dragonLayers";
import { LogoCarousel, type LogoItem } from "./LogoCarousel";
import { btnWhite, linkOnDark, wrap } from "./Sections";
import { SocialIcon } from "./SocialIcon";

// The hero page: the UTM dragon at poster scale. An ink silhouette on the red field, its head turned toward
// the headline and its mane running off the screen. One headline, one button, and a bar naming the games,
// each opening that game's page. The nav is 75px tall, so the hero fills what is left under it.
const place = (p: { left: number; top: number; width: number; height: number }) => ({
  left: `${p.left}%`,
  top: `${p.top}%`,
  width: `${p.width}%`,
  height: `${p.height}%`,
});
const pivot = (p: DragonPiece) => `${p.origin[0]}% ${p.origin[1]}%`;

export function HeroMark() {
  const { settings, games, gameShort, gameLogo, teams } = content;

  // The bar under the hero: the games UTM plays (the partners are in the Partners section)
  const items: LogoItem[] = [
    ...Object.keys(games).map((id): LogoItem => ({
      kind: "game",
      id,
      name: games[id],
      logo: gameLogo?.[id],
      short: gameShort?.[id],
      live: teams.some((t) => t.game === id),
    })),
  ];

  return (
    <section
      id="content"
      aria-labelledby="hero-title"
      className="on-dark field tex-red relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden text-white"
    >
      {/* Everything above the logo bar. The dragon is sized to this area, so the whole head, jaw and mane show and
          the bar never cuts it off. */}
      <div className="relative flex flex-1 flex-col">
        {/* The mark is decoration: it carries no information the headline does not. It is cut into a head and a
            mane of six strips (each a root and a tip piece) that stack back into the full mark (see
            scripts/cut-dragon.mjs). With motion allowed it floats and breathes, the mane ripples in the wind
            and the eye blinks (see globals.css). */}
        <div
          aria-hidden
          className="hero-slide pointer-events-none absolute bottom-0 left-[40%] aspect-[791/629] w-[90%] max-w-none md:bottom-auto md:left-auto md:right-[-4%] md:top-[3%] md:h-[94%] md:w-auto"
        >
          <div className="dragon-float relative h-full w-full">
            <div className="dragon-breathe absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={dragonHead.src} alt="" width={dragonHead.w} height={dragonHead.h} fetchPriority="high" draggable={false} className="absolute" style={place(dragonHead)} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dragon-eye.webp" alt="" width={55} height={61} className="dragon-eye absolute" style={{ left: "29.709%", top: "53.1%", width: "6.953%", height: "9.698%" }} />
              <div className="dragon-gust absolute inset-0">
                {dragonStrips.map((strip, i) => (
                  <div
                    key={strip.root.src}
                    className="dragon-sway absolute"
                    style={
                      {
                        ...place(strip.root),
                        transformOrigin: pivot(strip.root),
                        "--dur": `${5.2 + i * 0.4}s`,
                        "--dl": `${-i * 0.9}s`,
                        "--ra": `${0.55 + i * 0.05}deg`,
                      } as React.CSSProperties
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={strip.root.src} alt="" width={strip.root.w} height={strip.root.h} draggable={false} className="block h-full w-full" />
                    {strip.tip && (
                      <div className="dragon-tip absolute" style={{ ...place(strip.tip), transformOrigin: pivot(strip.tip) }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={strip.tip.src} alt="" width={strip.tip.w} height={strip.tip.h} draggable={false} className="block h-full w-full" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`${wrap} relative z-10 flex w-full flex-1 flex-col items-start justify-center py-12 md:py-20`}>
          <h1
            id="hero-title"
            className="hero-rise font-display text-[clamp(3.25rem,9vw,6rem)] font-extrabold italic uppercase leading-[0.95] tracking-[-0.02em]"
          >
            <span className="block">United</span>
            <span className="block">we are</span>
            <span className="block">stronger.</span>
          </h1>
          <p className="hero-rise mt-6 max-w-[34ch] text-lg leading-snug [--d:120ms] md:text-xl">
            {settings.recruitingOpen ? "Tryouts are open. " : ""}One club, every game. Come grow with us,
            whatever your level.
          </p>
          <div className="hero-rise mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 [--d:220ms]">
            {settings.recruitingOpen && (
              <a href={settings.applyFormUrl} data-track="apply_hero" className={btnWhite}>
                Join the squad
              </a>
            )}
            {/* Phones get the sticky Discord button, so this link is for larger screens */}
            <a
              href={settings.discordInvite}
              data-track="discord_hero"
              className={`hidden items-center gap-3 md:inline-flex ${linkOnDark}`}
            >
              <SocialIcon name="discord" className="size-6" />
              Discord
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t-[3px] border-track bg-ink pb-[calc(4.5rem+var(--rise)*0.4)] md:pb-[calc(var(--rise)*0.4)]">
        <LogoCarousel items={items} />
      </div>
    </section>
  );
}
