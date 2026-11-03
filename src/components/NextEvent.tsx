"use client";

import { useEffect, useState } from "react";
import type { EsportsEvent } from "@/content/types";
import { bgPhoto } from "./bgPhoto";

const when = new Intl.DateTimeFormat("en-PH", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Manila",
});

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [
    ["Days", Math.floor(s / 86400)],
    ["Hours", Math.floor((s % 86400) / 3600)],
    ["Minutes", Math.floor((s % 3600) / 60)],
    ["Seconds", s % 60],
  ] as const;
}

// Next event with a live countdown. The first render does not depend on the clock, so the static
// page and the browser agree; the countdown starts once the page is in the browser.
export function NextEvent({
  events,
  games,
  wrap,
}: {
  events: EsportsEvent[];
  games: Record<string, string>;
  wrap: string;
}) {
  const sorted = [...events].sort((a, b) => Date.parse(a.start) - Date.parse(b.start));
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const next = now === null ? sorted[0] : sorted.find((e) => Date.parse(e.start) > now);
  const remaining = next && now !== null ? Date.parse(next.start) - now : null;

  return (
    <section
      id="events"
      aria-labelledby="next-event-title"
      style={bgPhoto("events")}
      className="on-dark tex-dark slab ghost relative scroll-mt-4 bg-ink text-white [--gop:0.12] [--gpos:100%_40%]"
    >
      <div className={wrap}>
        <h2
          id="next-event-title"
          className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold italic uppercase leading-[1] tracking-[-0.01em]"
        >
          Next event
        </h2>
        {next ? (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
            <div>
              <p className="font-display text-2xl font-bold italic uppercase leading-tight md:text-3xl">
                {next.title}
              </p>
              <p className="mt-4 text-lg">
                {next.game ? `${games[next.game] ?? next.game} · ` : ""}
                {when.format(new Date(next.start))} (PH time)
              </p>
              {next.streamUrl && (
                <a
                  href={next.streamUrl}
                  data-track="event_stream"
                  className="cut-btn mt-8 inline-flex min-h-14 items-center bg-white px-14 text-lg font-bold uppercase tracking-wide text-track transition-colors hover:bg-track hover:text-white"
                >
                  Watch live
                </a>
              )}
            </div>

            <div>
              <p className="sr-only">
                Starts {when.format(new Date(next.start))}, Philippine time.
              </p>
              <ul aria-hidden className="grid grid-cols-4 gap-3 md:gap-5">
                {(remaining === null ? parts(0) : parts(remaining)).map(([label, value]) => (
                  <li key={label} className="skew bg-track px-1 py-4 text-center md:py-6">
                    <div className="unskew">
                      <p className="font-display text-3xl font-extrabold italic leading-none tabular-nums md:text-5xl">
                        {remaining === null ? "--" : String(value).padStart(2, "0")}
                      </p>
                      <p className="mt-2 text-sm md:text-base">{label}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <p className="font-display text-2xl font-bold italic uppercase leading-tight md:text-3xl">
              No event scheduled yet.
            </p>
            <p className="mt-4 text-lg">Follow our Discord to hear first.</p>
          </div>
        )}
      </div>
    </section>
  );
}
