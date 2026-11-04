import Link from "next/link";
import { content } from "@/content/site";
import { bgPhoto } from "./bgPhoto";
import { resultSlug } from "@/content/slug";
import { ClipTile } from "./ClipTile";
import { TeamGrid, type TeamTile } from "./TeamGrid";
import { Reveal } from "./Reveal";
import { SkelImg } from "./SkelImg";
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

// 2. The finish line. The home page shows the championships; the full list lives on its own page (/results).
// Counts come from the data, so nothing here can be invented.
const dateFmt = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric", timeZone: "UTC" });

// Every placing the club has earned, newest first, with the figures the summary line uses.
export function resultsData() {
  const list = [...content.achievements].sort((x, y) => Date.parse(y.date) - Date.parse(x.date));
  const champions = list.filter((r) => r.placement === "Champion");
  const others = list.filter((r) => r.placement !== "Champion");
  const gamesWon = new Set(list.map((r) => r.game).filter(Boolean)).size;
  const summary = [
    `${champions.length} ${champions.length === 1 ? "championship" : "championships"}`,
    `${list.length} ${list.length === 1 ? "finish" : "finishes"}`,
    `${gamesWon} ${gamesWon === 1 ? "game" : "games"}`,
  ].join(" · ");
  return { list, champions, others, summary };
}

type Achievement = (typeof content.achievements)[number];

// Posters are shown about 300px wide on the cards, so they use a light copy in /awards/thumbs
const thumbOf = (image: string) => image.replace("/images/awards/", "/images/awards/thumbs/");

// One result: placement and date, the poster or certificate (opens the full image), the event, and one grey line.
export function ResultCard({ a, className = "" }: { a: Achievement; className?: string }) {
  const { games } = content;
  const champion = a.placement === "Champion";
  return (
    <article className={`bg-card p-3 md:p-4 ${className}`}>
      <div className="flex items-center justify-between gap-3 pb-3">
        <span
          className={
            champion
              ? "block bg-track px-4 py-1 font-display text-lg font-extrabold italic uppercase leading-none"
              : "block font-display text-lg font-bold italic uppercase leading-none text-white/90"
          }
        >
          {a.placement}
        </span>
        <span className="text-sm text-white/80">{dateFmt.format(new Date(a.date))}</span>
      </div>
      <div className="relative aspect-square bg-well">
        {a.image ? (
          <Link href={`/results/${resultSlug(a)}`} data-track="result_open" className="block h-full w-full">
            <SkelImg
              src={thumbOf(a.image)}
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
      <p className="mt-1 text-sm text-white/70">
        {[a.game ? games[a.game] ?? a.game : "", a.team].filter(Boolean).join(" · ")}
      </p>
    </article>
  );
}

export function Results() {
  const { champions, list, summary } = resultsData();
  if (champions.length === 0) return null;
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
            <p className="mt-4 max-w-[40ch] text-lg leading-snug">Our championships, newest first.</p>
          </div>
          <p className="text-lg font-semibold">{summary}</p>
        </div>
      </Reveal>

      <Reveal delay={150}>
        <div
          role="region"
          aria-label="Our championships, scroll sideways"
          tabIndex={0}
          className="results-track mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:px-12 lg:mx-auto lg:grid lg:max-w-[90rem] lg:grid-cols-4 lg:overflow-visible"
        >
          {champions.map((r) => (
            <ResultCard
              key={`${r.event}-${r.date}`}
              a={r}
              className="w-[78vw] max-w-[19rem] shrink-0 snap-start lg:w-auto lg:max-w-none"
            />
          ))}
        </div>
      </Reveal>

      {list.length > champions.length && (
        <Reveal className={`${wrap} mt-10`}>
          <Link href="/results" data-track="results_all" className={btnWhite}>
            See every finish
          </Link>
        </Reveal>
      )}
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
              className="relative md:pl-10 md:before:absolute md:before:inset-y-0 md:before:left-0 md:before:w-[3px] md:before:bg-white md:before:content-[''] md:first:pl-0 md:first:before:hidden"
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
  const tiles: TeamTile[] = Object.entries(games).map(([id, name]) => {
    const own = teams.filter((t) => t.game === id);
    const players = own.reduce((n, t) => n + t.players.length, 0);
    return {
      id,
      name,
      art: gameArt?.[id],
      pos: gameArtPosition?.[id] ?? "50% 30%",
      detail:
        own.length > 0
          ? `${own.map((t) => t.name).join(", ")} · ${players} ${players === 1 ? "player" : "players"}`
          : "Coming soon",
    };
  });
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
        <TeamGrid tiles={tiles} />
      </Reveal>
    </section>
  );
}

// Packs photos into rows. Inside a row every photo has the same height and a width in proportion to its shape,
// so the row fills the page width and nothing is cropped.
export type Moment = (typeof content.moments)[number];
const ratioOf = (m: Moment) => (m.videoUrl ? 16 / 9 : (m.width ?? 1137) / (m.height ?? 640));
function packRows(list: Moment[]) {
  const rows: { items: Moment[]; sum: number }[] = [];
  let cur: Moment[] = [];
  let sum = 0;
  for (const m of list) {
    cur.push(m);
    sum += ratioOf(m);
    if (sum >= 3.2) {
      rows.push({ items: cur, sum });
      cur = [];
      sum = 0;
    }
  }
  // A short last row joins the row above it, so no row leaves a gap at the right
  if (cur.length && rows.length && sum < 2.6) {
    const last = rows[rows.length - 1];
    last.items.push(...cur);
    last.sum += sum;
  } else if (cur.length) rows.push({ items: cur, sum });
  return rows;
}

export function Mosaic({ items }: { items: Moment[] }) {
  const rows = packRows(items);
  return (
    <div className="space-y-3 md:space-y-4">
      {rows.map((row, r) => (
        <div
          key={r}
          className="flex flex-col gap-3 md:flex-row md:gap-4"
          style={row.sum < 2.2 ? { maxWidth: `${Math.round((row.sum / 3.2) * 100)}%` } : undefined}
        >
          {row.items.map((m) => (
            <figure
              key={m.image}
              style={{ "--ar": ratioOf(m) } as React.CSSProperties}
              className="group relative min-w-0 overflow-hidden bg-well md:[flex:var(--ar)_1_0%]"
            >
              {m.videoUrl ? (
                <ClipTile m={m} />
              ) : (
                <SkelImg
                  src={m.image}
                  alt={m.alt}
                  loading="lazy"
                  width={m.width ?? 1137}
                  height={m.height ?? 640}
                  draggable={false}
                  className={`block h-auto w-full ${ratioOf(m) < 1 ? "max-md:mx-auto max-md:max-h-[34rem] max-md:w-auto" : ""}`}
                />
              )}
              {/* The caption sits over a soft fade at the bottom. With a mouse it appears on hover; on touch screens it is always there. */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(22_9_10/0.85),rgb(22_9_10/0))] px-4 pb-3 pt-10 transition-opacity duration-300 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100">
                <span className="block font-display text-base font-bold italic uppercase leading-tight">{m.title}</span>
                {m.caption && <span className="mt-0.5 block text-sm leading-snug">{m.caption}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}

// 6. Highlights: photos now, clips later. A clip loads only when a visitor taps play.
// The home page shows the first photos; the rest are on their own page (/highlights).
export function Highlights() {
  const { settings, moments, moreMoments } = content;
  return (
    <section
      id="highlights"
      aria-labelledby="highlights-title"
      className="on-dark tex-dark slab ghost relative scroll-mt-4 bg-ink text-white [--gop:0.12] [--gpos:0%_50%]"
    >
      <Reveal className={wrap}>
        <h2 id="highlights-title" className={h2}>
          Highlights
        </h2>
        <p className="mt-4 max-w-[40ch] text-lg leading-snug">Moments from the club.</p>
      </Reveal>
      <Reveal delay={150} className={`${wrap} mt-10`}>
        <Mosaic items={moments} />
      </Reveal>
      <Reveal className={`${wrap} mt-10 flex flex-wrap items-center gap-x-8 gap-y-4`}>
        {moreMoments.length > 0 && (
          <Link href="/highlights" data-track="highlights_all" className={btnWhite}>
            See all highlights
          </Link>
        )}
        <a href={settings.discordInvite} data-track="discord_highlights" className={linkOnDark}>
          Join our Discord
        </a>
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
                className="lift block bg-ink text-white hover:bg-track"
              >
                <span className="flex items-center gap-4 px-7 py-4">
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
      {sponsors.length > 0 && (
        <>
          <Reveal className={`${wrap} text-center`}>
            <h2 className={h2}>Our partners</h2>
          </Reveal>
          <Reveal className="mt-10">
            <div className="bg-white py-8 md:py-10">
              <ul className={`${wrap} flex flex-wrap items-center justify-center gap-x-16 gap-y-8 md:gap-x-28`}>
                {sponsors.map((sp) => {
                  const img = sp.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={sp.logo} alt={sp.url ? "" : sp.name} loading="lazy" className="h-14 w-auto md:h-[4.5rem]" />
                  ) : (
                    <span className="font-display text-3xl font-extrabold italic uppercase text-ink">{sp.name}</span>
                  );
                  return (
                    <li key={sp.name}>
                      {sp.url ? (
                        <a
                          href={sp.url}
                          target="_blank"
                          rel="noopener"
                          aria-label={`${sp.name} (opens in a new tab)`}
                          className="inline-flex min-h-12 items-center transition duration-150 hover:-translate-y-0.5"
                        >
                          {img}
                        </a>
                      ) : (
                        img
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </>
      )}
      <Reveal className={`${wrap}${sponsors.length > 0 ? " mt-16" : ""} text-center`}>
        <h2 id="partner-title" className={h2}>
          Partner with us
        </h2>
        <p className="mx-auto mt-4 max-w-[44ch] text-lg leading-snug">
          Back a club that is building its team in the open. Tell us who you are and what you
          have in mind, and an officer will reply by email.
        </p>
        <div className="mt-8">
          <a href={settings.partnerFormUrl} data-track="partner_form" className={btnWhite}>
            Send a partner enquiry
          </a>
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
  const link = "inline-flex min-h-11 items-center hover:underline hover:underline-offset-4";
  const columns: { title: string; items: [string, string][] }[] = [
    { title: "Play", items: [...Object.entries(games).map(([id, name]): [string, string] => [name, `/teams/${id}`]), ["Join us", "/#join"]] },
    { title: "Watch", items: [["Results", "/#results"], ["Events", "/#events"], ["Highlights", "/#highlights"], ["Our CEO", "/ceo"], ["Organization", "/organization"], ["About", "/about"]] },
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
