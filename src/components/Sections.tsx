import Link from "next/link";
import { content } from "@/content/site";
import { bgPhoto } from "./bgPhoto";
import { resultSlug } from "@/content/slug";
import { ClipTile } from "./ClipTile";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./SocialIcon";

export const wrap = "mx-auto max-w-[90rem] px-6 md:px-12";
export const h2 =
  "font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]";
export const h3 =
  "font-display text-2xl font-extrabold italic uppercase leading-none text-track md:text-3xl";

export const btnWhite =
  "cut-btn inline-flex min-h-14 items-center bg-white px-14 text-lg font-bold uppercase tracking-wide text-track transition-colors hover:bg-ink hover:text-white";
export const btnInk =
  "cut-btn inline-flex min-h-14 items-center bg-ink px-14 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-track";
export const btnRed =
  "cut-btn inline-flex min-h-14 items-center bg-track px-14 text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-ink";
export const linkOnDark =
  "text-lg font-bold uppercase tracking-wide underline decoration-2 underline-offset-8 hover:no-underline";

// 2. The finish line: every placing the club has earned, newest first, each with its poster or certificate.
// Counts come from the data, so nothing here can be invented.
const dateFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });
export function Results() {
  const { achievements, games } = content;
  const list = [...achievements].sort((x, y) => Date.parse(y.date) - Date.parse(x.date));
  const champs = list.filter((a) => a.placement === "Champion").length;
  const gamesWon = new Set(list.map((a) => a.game).filter(Boolean)).size;
  const stats = [
    [String(champs), champs === 1 ? "Championship" : "Championships"],
    [String(list.length), list.length === 1 ? "Finish" : "Finishes"],
    [String(gamesWon), gamesWon === 1 ? "Game" : "Games"],
  ];
  if (list.length === 0) return null;
  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="on-dark tex-dark slab ghost relative scroll-mt-4 bg-ink text-white [--gop:0.1] [--gpos:100%_50%]"
    >
      <Reveal className={wrap}>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 id="results-title" className={h2}>
              The finish line
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg leading-snug">
              Every placing we have earned, newest first. Swipe to see them all.
            </p>
          </div>
          <ul className="flex flex-wrap gap-3">
            {stats.map(([n, label]) => (
              <li key={label} className="skew bg-track">
                <div className="unskew px-4 py-2 text-center md:px-8">
                  <p className="font-display text-3xl font-extrabold italic leading-none md:text-4xl">{n}</p>
                  <p className="mt-1 text-sm">{label}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={150}>
      <div
        role="region"
        aria-label="Our results, scroll sideways"
        tabIndex={0}
        className="results-track mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:px-12"
      >
        {list.map((a) => {
          const champion = a.placement === "Champion";
          return (
            <article
              key={`${a.event}-${a.date}`}
              className="w-[78vw] max-w-[19rem] shrink-0 snap-start bg-[#241214] p-3 md:p-4"
            >
              <div className="flex items-center justify-between gap-3 pb-3">
                <span
                  className={`block px-4 py-1 font-display text-lg font-extrabold italic uppercase leading-none ${champion ? "bg-track text-white" : "bg-white text-ink"}`}
                >
                  {a.placement}
                </span>
                <span className="text-sm text-white/80">{dateFmt.format(new Date(a.date))}</span>
              </div>
              <div className="relative aspect-square bg-[#12080a]">
                {a.image ? (
                  <Link href={`/results/${resultSlug(a)}`} data-track="result_open" className="block h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={a.image}
                      alt={a.imageAlt ?? a.event}
                      loading="lazy"
                      width={1000}
                      height={1000}
                      className="h-full w-full object-contain"
                    />
                    <span className="sr-only"> (open the full image)</span>
                  </Link>
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[url('/images/bg-dragon-mark.webp')] bg-[length:75%_auto] bg-center bg-no-repeat opacity-35"
                  />
                )}
              </div>
              <h3 className="mt-4 font-display text-lg font-bold italic uppercase leading-tight">{a.event}</h3>
              <p className="mt-1 text-sm text-white/80">
                {a.game ? games[a.game] ?? a.game : ""}
              </p>
              {(a.team || a.note) && (
                <p className="mt-1 text-sm text-white/80">{[a.team, a.note].filter(Boolean).join(". ")}</p>
              )}
            </article>
          );
        })}
      </div>
      </Reveal>
    </section>
  );
}

// 3. Join: what to expect, the tryout form, the Discord button. Steps are a real sequence, so they are numbered.
export function Join() {
  const { settings, about } = content;
  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="on-dark field tex-red slab ghost relative scroll-mt-4 text-white [--gpos:100%_60%]"
    >
      <Reveal className={wrap}>
        <h2 id="join-title" className={h2}>
          Join the squad
        </h2>
        <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
          {about.steps.map((s, i) => (
            <li
              key={s.title}
              className="relative md:pl-10 md:before:absolute md:before:inset-y-0 md:before:left-0 md:before:w-[3px] md:before:bg-white md:before:content-[''] md:before:skew md:first:pl-0 md:first:before:hidden"
            >
              <p aria-hidden className="font-display text-[3.5rem] font-extrabold italic leading-[0.85]">
                {i + 1}
              </p>
              <p className="mt-4 font-display text-xl font-bold italic uppercase leading-none">{s.title}</p>
              <p className="mt-2 max-w-[34ch]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={settings.applyFormUrl} data-track="apply_join" className={btnWhite}>
            Apply for tryouts
          </a>
          <a href={settings.discordInvite} data-track="discord_join" className={linkOnDark}>
            Join our Discord
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// 4. Teams: a tile for every game the club plays, with that game's character on the right.
// Each tile opens that game's own page (/teams/<game>).
export function Teams() {
  const { teams, games, gameArt, gameArtPosition } = content;
  const tiles = Object.entries(games).map(([id, name]) => ({
    id,
    name,
    art: gameArt?.[id],
    pos: gameArtPosition?.[id] ?? "50% 30%",
    teams: teams.filter((t) => t.game === id),
  }));
  return (
    <section
      id="teams"
      aria-labelledby="teams-title"
      className="tex-light slab ghost relative scroll-mt-4 bg-white [--gpos:100%_50%]"
    >
      <Reveal className={wrap}>
        <h2 id="teams-title" className={h2}>
          Teams
        </h2>

        <ul className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
          {tiles.map((g, i) => {
            const live = g.teams.length > 0;
            const players = g.teams.reduce((n, t) => n + t.players.length, 0);
            return (
              <Reveal as="li" key={g.id} delay={(i % 2) * 120} className="md:[&:last-child:nth-child(odd)]:col-span-2">
                <Link
                  href={`/teams/${g.id}`}
                  data-track={`team_${g.id}`}
                  className={`lift skew relative block overflow-hidden text-white bg-ink [--tile:#16090a] hover:bg-track hover:[--tile:#d4232b]`}
                >
                  {g.art && (
                    <span aria-hidden className="unskew absolute inset-y-0 -right-8 w-[calc(62%+2rem)] md:w-[calc(55%+2rem)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={g.art}
                        alt=""
                        loading="lazy"
                        width={900}
                        height={506}
                        style={{ objectPosition: g.pos }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 bg-[linear-gradient(to_right,var(--tile)_0%,transparent_65%)]" />
                    </span>
                  )}
                  <span className="unskew relative block min-h-36 px-7 py-5 md:min-h-40 md:px-8">
                    <span className="block max-w-[68%] font-display text-2xl font-extrabold italic uppercase leading-[1] md:text-3xl">
                      {g.name}
                    </span>
                    <span className="mt-2 block max-w-[68%] text-base">
                      {live
                        ? `${g.teams.map((t) => t.name).join(", ")} · ${players} ${players === 1 ? "player" : "players"}`
                        : "Coming soon"}
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}

// 6. Highlights: photos now, clips later. A clip loads only when a visitor taps play.
export function Highlights() {
  const { settings } = content;
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-title"
      className="on-dark field tex-red slab ghost relative scroll-mt-4 text-white [--gpos:0%_50%]"
    >
      <Reveal className={wrap}>
        <h2 id="highlights-title" className={h2}>
          Highlights
        </h2>
        <ul className="mt-10 grid gap-10 md:grid-cols-[3fr_2fr_2fr] md:items-start md:gap-8">
          {content.moments.map((m, i) => (
            <Reveal as="li" key={m.image} delay={i * 150} className={i === 1 ? "md:mt-14" : i === 2 ? "md:mt-7" : ""}>
              <ClipTile m={m} />
              <p className="mt-4 font-display text-xl font-bold italic uppercase leading-none">{m.title}</p>
              <p className="mt-1 text-base">{m.caption}</p>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10">
          <a href={settings.discordInvite} data-track="discord_highlights" className={btnWhite}>
            Join our Discord
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// 7. Community: where to find us. Discord leads.
export function Community() {
  const { settings } = content;
  const tiles = [
    ["Discord", "Join the server", settings.social.discord],
    ["Facebook", "Follow us", settings.social.facebook],
    ["Instagram", "Follow us", settings.social.instagram],
    ["TikTok", "Watch us", settings.social.tiktok],
  ] as const;
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      style={bgPhoto("community", 0.12)}
      className="tex-light slab ghost relative scroll-mt-4 bg-white [--gpos:0%_40%]"
    >
      <Reveal className={wrap}>
        <h2 id="community-title" className={h2}>
          Community
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {tiles.map(([name, verb, href], i) => (
            <Reveal as="li" key={name} delay={i * 120}>
              <a
                href={href}
                data-track={`community_${name.toLowerCase()}`}
                className="lift skew block bg-ink text-white hover:bg-track"
              >
                <span className="unskew flex items-center gap-4 px-7 py-4">
                  <SocialIcon name={name} className="size-8 shrink-0 md:size-9" />
                  <span className="block">
                    <span className="block font-display text-xl font-extrabold italic uppercase leading-none md:text-2xl">
                      {name}
                    </span>
                    <span className="mt-2 block text-base">{verb}</span>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

// 8. Partners: sponsor logos (hidden until there are sponsors) and the partner enquiry.
export function Partner() {
  const { sponsors, settings } = content;
  return (
    <section
      id="partners"
      aria-labelledby="partner-title"
      style={bgPhoto("partners")}
      className="on-dark tex-dark slab ghost relative scroll-mt-4 bg-ink text-white [--gop:0.12] [--gpos:100%_50%]"
    >
      <Reveal className={wrap}>
        {sponsors.length > 0 && (
          <div className="mb-16">
            <h2 className={h2}>Our partners</h2>
            <ul className="mt-10 flex flex-wrap gap-3 md:gap-4">
              {sponsors.map((sp) => {
                const body = (
                  <span className="unskew flex min-h-28 min-w-44 flex-col items-center justify-center gap-2 px-10 py-3 md:min-h-32 md:min-w-52">
                    {sp.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={sp.logo} alt="" loading="lazy" className="max-h-12 w-auto md:max-h-14" />
                    ) : (
                      <span className="font-display text-2xl font-extrabold italic uppercase text-ink">{sp.name}</span>
                    )}
                    {sp.logo && <span className="text-xs font-bold uppercase tracking-wide text-ink">{sp.name}</span>}
                  </span>
                );
                return (
                  <li key={sp.name} className="skew bg-white">
                    {sp.url ? (
                      <a href={sp.url} target="_blank" rel="noopener" aria-label={sp.name} className="block">
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <h2 id="partner-title" className={h2}>
              Partner with us
            </h2>
            <p className="mt-4 max-w-[44ch] text-lg leading-snug">
              Back a club that is building its team in the open. Tell us who you are and what you
              have in mind, and an officer will reply by email.
            </p>
          </div>
          <div>
            <a href={settings.partnerFormUrl} data-track="partner_form" className={btnWhite}>
              Send a partner enquiry
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// 9. FAQ and about: answers to the questions applicants ask, and the story with a link to the full page.
export function Faq() {
  const { faq, about } = content;
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="tex-light slab ghost relative scroll-mt-4 bg-white [--gpos:0%_30%]"
    >
      <Reveal className={`${wrap} grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20`}>
        <div>
          <h2 id="faq-title" className={h2}>
            FAQ
          </h2>
          <div className="mt-10 border-t-[3px] border-ink">
            {faq.map((f) => (
              <details key={f.question} className="group border-b border-ink/25">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-bold italic uppercase leading-tight marker:hidden md:text-xl [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <span aria-hidden className="text-4xl leading-none text-track group-open:hidden">+</span>
                  <span aria-hidden className="hidden text-4xl leading-none text-track group-open:inline">−</span>
                </summary>
                <p className="max-w-[60ch] pb-6 text-lg leading-snug">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div>
          <h3 className={h3}>Our story</h3>
          <p className="mt-4 max-w-[48ch] text-lg leading-snug">{about.story}</p>
          <Link href="/about" data-track="about_more" className={`${btnInk} mt-8`}>
            Mission and vision
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

// 10. Footer: contact, social links, privacy notice.
export function Footer() {
  const { settings, games } = content;
  const col = "text-base";
  const head = "font-display text-xl font-extrabold italic uppercase leading-none text-track";
  const link = "inline-block py-2 hover:underline hover:underline-offset-4";
  const columns: { title: string; items: [string, string][] }[] = [
    { title: "Play", items: [...Object.entries(games).map(([id, name]): [string, string] => [name, `/teams/${id}`]), ["Join us", "/#join"]] },
    { title: "Watch", items: [["Results", "/#results"], ["Events", "/#events"], ["Highlights", "/#highlights"], ["About", "/about"]] },
    {
      title: "Connect",
      items: [
        ["Discord", settings.social.discord],
        ["Facebook", settings.social.facebook],
        ["Instagram", settings.social.instagram],
        ["TikTok", settings.social.tiktok],
      ],
    },
    { title: "Partners", items: [["CDG Solutions", "/#partners"], ["Nbrims", "/#partners"], ["Contact", `mailto:${settings.contactEmail}`]] },
  ];
  return (
    <footer className="on-dark relative bg-ink text-white">
      <div aria-hidden className="finish-line" />
      <div className="foot-dragon tex-dark pb-28 md:pb-12">
        <Reveal className={`${wrap} pt-12`}>
          <div className="flex flex-col gap-6 border-b border-white/25 pb-12 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold italic uppercase leading-[1]">
              Ready to play? Join the roster.
            </p>
            <a href={settings.discordInvite} data-track="discord_footer" className={btnWhite + " self-start"}>
              Join the Discord
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/utm-logo-white.png" alt="UTM Esports" width={900} height={813} className="col-span-2 h-20 w-auto self-start md:col-span-1" />
            {columns.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className={head}>{c.title}</p>
                <ul className={`mt-4 ${col} font-semibold`}>
                  {c.items.map(([label, href]) => (
                    <li key={label + href}>
                      <a href={href} className={link}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-16 flex flex-col gap-3 border-t border-white/25 pt-8">
            <p className="text-base">
              © {new Date().getFullYear()} {settings.orgName}. {settings.tagline}{" "}
              <a href={settings.privacyUrl} className="underline underline-offset-4 hover:no-underline">
                Privacy notice
              </a>
            </p>
            <p className="max-w-[60ch] text-sm text-white/80">
              Game names, logos and character art belong to their publishers (Riot Games, Moonton and Tencent). UTM Esports
              is not affiliated with or endorsed by them.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
