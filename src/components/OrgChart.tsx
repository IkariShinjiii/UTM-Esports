import { content } from "@/content/site";
import { SocialIcon } from "./SocialIcon";
import type { OrgGroup } from "@/content/types";

// One box of the chart: a title, then the people in it
function Box({ g, top = false, className = "" }: { g: OrgGroup; top?: boolean; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-sm bg-card text-white ${className}`}>
      <div className={`px-5 py-4 text-center ${top ? "bg-track" : "border-b border-white/20"}`}>
        <h2 className="font-display text-xl font-extrabold italic uppercase leading-tight">{g.title}</h2>
        {g.subtitle && <p className="mt-1 text-base font-semibold">{g.subtitle}</p>}
      </div>
      <ul className="space-y-1 px-5 py-4 text-center text-lg">
        {g.names.map((p) => {
          const name = typeof p === "string" ? p : p.name;
          const tiktok = typeof p === "string" ? undefined : p.tiktok;
          return (
            <li key={name} className="flex items-center justify-center gap-2">
              {name}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${name} on TikTok (opens in a new tab)`}
                  data-track="org_tiktok"
                  className="grid size-11 place-items-center transition-colors hover:text-track"
                >
                  <SocialIcon name="tiktok" className="size-6" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// A short straight line joining one box to the next
const stem = "mx-auto block h-8 w-[3px] bg-white/40";

// The org chart, top to bottom: CEO, admins, the three groups side by side, then the first team.
// The names come from `org` in the content file.
export function OrgChart() {
  const { org } = content;
  return (
    <div>
      <Box g={org.top} top />
      <span aria-hidden className={stem} />
      <Box g={org.second} />
      <span aria-hidden className={stem} />
      <div className="relative md:pt-8">
        {/* the bar that joins the three groups (large screens): it runs from the middle of the first box to the middle of the last */}
        <span
          aria-hidden
          className="absolute left-[calc((100%-4rem)/6)] right-[calc((100%-4rem)/6)] top-0 hidden h-[3px] bg-white/40 md:block"
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {org.third.map((g) => (
            <div
              key={g.title}
              className="relative md:before:absolute md:before:-top-8 md:before:left-1/2 md:before:h-8 md:before:w-[3px] md:before:-translate-x-1/2 md:before:bg-white/40 md:before:content-['']"
            >
              <Box g={g} />
            </div>
          ))}
        </div>
      </div>
      <Box g={org.division} className="mt-16" />
    </div>
  );
}
