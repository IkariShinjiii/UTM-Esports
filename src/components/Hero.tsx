import Link from "next/link";
import { content } from "@/content/site";
import { HeroSlides } from "./HeroSlides";

// The picture shuffle section, under the next event: the club's story on the left, the picture shuffle on the
// right, on the red field. Phones stack them, words first. The hero at the top of the page carries the join
// and Discord buttons, so this block has one link only.
export function Hero() {
  const { about } = content;

  return (
    <section
      id="squad"
      aria-labelledby="shuffle-title"
      className="on-dark field tex-red ghost relative overflow-hidden pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gpos:-10%_60%] md:pt-14"
    >
      <div className="mx-auto grid max-w-[90rem] items-center gap-10 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h2
            id="shuffle-title"
            className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]"
          >
            Our story
          </h2>
          <p className="mt-4 max-w-[38ch] text-lg leading-snug">{about.story}</p>
          <div className="mt-8">
            <Link
              href="/organization"
              data-track="story_team"
              className="cut-btn inline-flex min-h-14 items-center bg-white px-14 text-lg font-bold uppercase tracking-wide text-track transition-colors hover:bg-ink hover:text-white"
            >
              Meet the team
            </Link>
          </div>
        </div>

        <HeroSlides slides={content.heroSlides} />
      </div>
    </section>
  );
}
