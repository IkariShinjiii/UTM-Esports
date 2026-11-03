import { content } from "@/content/site";
import { HeroSlides } from "./HeroSlides";

const DISCORD_PATH =
  "M19.3 5.3A16.5 16.5 0 0 0 15.2 4l-.2.4a15 15 0 0 0-6 0L8.8 4a16.5 16.5 0 0 0-4.1 1.3C2.1 9.2 1.4 13 1.7 16.7a16.6 16.6 0 0 0 5 2.5l1.1-1.8a10.800 10.800 0 0 1-1.700-.800l.4-.3a11.800 11.800 0 0 0 10.100 0l.4.3c-.5.3-1.100.6-1.700.8l1.100 1.800a16.600 16.600 0 0 0 5-2.500c.4-4.300-.7-8.100-3-11.400ZM8.700 14.500c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Zm6.600 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Z";

// The hero: words and the one action on the left, the picture shuffle on the right, on the red field.
// Phones stack them, words first, so "Join the squad" is on the first screen.
export function Hero() {
  const { settings } = content;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:-10%_60%] md:pt-14"
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]"
          >
            <span className="block">United</span>
            <span className="block">we are</span>
            <span className="block">stronger.</span>
          </h1>
          <p className="mt-4 max-w-[34ch] text-lg leading-snug">
            {settings.recruitingOpen ? "Tryouts are open. " : ""}One club, every game. Come grow
            with us, whatever your level.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {settings.recruitingOpen && (
              <a
                href={settings.applyFormUrl}
                data-track="apply_hero"
                className="cut-btn inline-flex min-h-14 items-center bg-white px-14 text-lg font-bold uppercase tracking-wide text-track transition-colors hover:bg-ink hover:text-white"
              >
                Join the squad
              </a>
            )}
            {/* Phones get the sticky Discord button, so this link is for larger screens */}
            <a
              href={settings.discordInvite}
              data-track="discord_hero"
              className="hidden items-center gap-3 text-lg font-bold uppercase tracking-wide underline decoration-2 underline-offset-8 hover:no-underline md:inline-flex"
            >
              <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d={DISCORD_PATH} />
              </svg>
              Discord
            </a>
          </div>
        </div>

        <HeroSlides slides={content.heroSlides} />
      </div>
    </section>
  );
}
