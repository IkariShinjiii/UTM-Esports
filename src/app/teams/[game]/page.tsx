import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { Nav } from "@/components/Nav";
import { Footer, btnRed, btnWhite, wrap } from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(content.games).map((game) => ({ game }));
}

export async function generateMetadata({ params }: { params: Promise<{ game: string }> }): Promise<Metadata> {
  const { game } = await params;
  const name = content.games[game] ?? game;
  return {
    title: `${name} | ${content.settings.orgName}`,
    description: `The UTM Esports ${name} team.`,
  };
}

// One page per game: the team's header, then a card for every player. Players are shown by in-game name only;
// roles and captain stay hidden until the org confirms them.
export default async function GamePage({ params }: { params: Promise<{ game: string }> }) {
  const { game } = await params;
  const { games, teams, settings, gameArt, gameLogo, gameHeaderPosition } = content;
  const name = games[game] ?? game;
  const gameTeams = teams.filter((t) => t.game === game);
  const players = gameTeams.reduce((n, t) => n + t.players.length, 0);
  const art = gameArt?.[game];
  const logo = gameLogo?.[game];
  const others = Object.entries(games).filter(([id]) => id !== game);

  return (
    <>
      <Nav />
      <div
        className="on-dark tex-dark ghost relative overflow-hidden bg-ink pb-[calc(var(--rise)+3rem)] pt-10 text-white [--gop:0.14] [--gpos:95%_12%] [--ghost-size:auto_78%] md:pt-14"
        style={
          art
            ? ({
                "--ghost-img": `url("${art}")`,
                "--ghost-size": "cover",
                "--gpos": gameHeaderPosition?.[game] ?? "70% 22%",
                "--gop": 0.2,
                "--ghost-filter": "grayscale(1)",
              } as React.CSSProperties)
            : undefined
        }
      >
        <div className={wrap}>
          <BackButton fallback="/#teams" />
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" width={640} height={240} className="mt-6 h-16 w-auto md:h-24" />
          )}
          <h1
            className={
              logo
                ? "sr-only"
                : "mt-6 font-display text-[clamp(2.25rem,4.4vw,3.5rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]"
            }
          >
            {name}
          </h1>
          <p className="mt-4 text-lg">
            {gameTeams.length > 0
              ? `${gameTeams.map((t) => t.name).join(", ")} · ${players} ${players === 1 ? "player" : "players"}`
              : "Coming soon"}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            {settings.recruitingOpen && gameTeams.length > 0 && (
              <a href={gameTeams[0].applyUrl ?? settings.applyFormUrl} data-track={`apply_${game}`} className={btnRed}>
                Apply for this game
              </a>
            )}
          </div>
        </div>
      </div>

      <main>
        <section aria-labelledby="players-title" className="on-dark tex-dark slab relative bg-ink text-white">
          <div className={wrap}>
            {gameTeams.length > 0 ? (
              <div className="space-y-16">
                {gameTeams.map((team, i) => (
                  <div key={team.name}>
                    <h2
                      id={i === 0 ? "players-title" : undefined}
                      className="font-display text-2xl font-extrabold italic uppercase leading-none md:text-3xl"
                    >
                      {team.name}
                    </h2>
                    <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
                      {team.players.map((pl) => (
                        <li key={pl.ign} className="bg-[#241214] p-3 pb-5 text-white md:p-4 md:pb-6">
                          <div className="relative aspect-square overflow-hidden bg-[#12080a]">
                            {pl.photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={pl.photo} alt={pl.ign} loading="lazy" className="h-full w-full object-cover" />
                            ) : (
                              <>
                                <span
                                  aria-hidden
                                  className="absolute inset-0 bg-[url('/images/bg-dragon-mark.webp')] bg-[length:75%_auto] bg-center bg-no-repeat opacity-35"
                                />
                                <span className="absolute inset-x-0 bottom-8 text-center text-sm text-white/80">
                                  Photo coming soon
                                </span>
                              </>
                            )}
                            <span aria-hidden className="absolute left-0 top-0 size-3 bg-track [clip-path:polygon(0_0,100%_0,0_100%)]" />
                            <span aria-hidden className="absolute right-0 top-0 size-3 bg-track [clip-path:polygon(0_0,100%_0,100%_100%)]" />
                            <span aria-hidden className="absolute bottom-0 left-0 size-3 bg-track [clip-path:polygon(0_0,0_100%,100%_100%)]" />
                            <span aria-hidden className="absolute bottom-0 right-0 size-3 bg-track [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
                          </div>
                          <p className="mt-5 text-center font-display text-lg font-bold italic uppercase leading-tight md:text-xl">
                            {pl.ign}
                          </p>
                          <p className="mt-1 text-center text-sm text-white/70">Player</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-[48ch]">
                <h2
                  id="players-title"
                  className="font-display text-2xl font-extrabold italic uppercase leading-none md:text-3xl"
                >
                  No team yet
                </h2>
                <p className="mt-4 text-lg leading-snug">
                  We are building our {name} team. Join our Discord to hear about tryouts first.
                </p>
                <a href={settings.discordInvite} data-track={`discord_${game}_empty`} className={`${btnWhite} mt-8`}>
                  Join our Discord
                </a>
              </div>
            )}

            <div className="mt-16 border-t border-white/20 pt-8">
              <p className="font-display text-2xl font-bold italic uppercase leading-none">Other games</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 text-lg font-bold uppercase tracking-wide">
                {others.map(([id, n]) => (
                  <li key={id}>
                    <Link href={`/teams/${id}`} className="underline decoration-2 underline-offset-8 hover:no-underline">
                      {n}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
