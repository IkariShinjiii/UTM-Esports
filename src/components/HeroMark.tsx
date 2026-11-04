import { content } from "@/content/site";
import { LogoCarousel, type LogoItem } from "./LogoCarousel";
import { btnWhite, linkOnDark, wrap } from "./Sections";
import { SocialIcon } from "./SocialIcon";

// The hero page: the UTM dragon at poster scale. An ink silhouette on the red field, its head turned toward
// the headline and its mane running off the screen. One headline, one button, and a bar naming the games,
// each opening that game's page. The nav is 75px tall, so the hero fills what is left under it.
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
      id="top"
      aria-labelledby="hero-title"
      className="on-dark field tex-red relative flex min-h-[calc(100svh-4.75rem)] flex-col overflow-hidden text-white"
    >
      {/* The mark is decoration: it carries no information the headline does not */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dragon-ink.webp"
        alt=""
        aria-hidden
        width={791}
        height={629}
        fetchPriority="high"
        className="hero-slide pointer-events-none absolute bottom-0 right-0 w-[190%] max-w-none translate-x-[47%] translate-y-[8%] md:bottom-auto md:right-[-4%] md:top-1/2 md:h-[106%] md:w-auto md:translate-x-0 md:-translate-y-1/2"
      />

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

      <div className="relative z-10 border-t-[3px] border-track bg-ink pb-[4.5rem] md:pb-0">
        <LogoCarousel items={items} />
      </div>
    </section>
  );
}
