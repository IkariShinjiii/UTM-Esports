import { content } from "@/content/site";

// B2: sticky Discord join button, phones only (desktop has it in the top bar).
export function StickyDiscord() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-6 pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden">
      <a
        href={content.settings.discordInvite}
        data-track="discord_sticky"
        className="cut-btn pointer-events-auto inline-flex min-h-14 items-center gap-3 bg-ink px-12 text-base font-bold uppercase tracking-wide text-white"
      >
        <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M19.3 5.3A16.5 16.5 0 0 0 15.2 4l-.2.4a15 15 0 0 0-6 0L8.8 4a16.5 16.5 0 0 0-4.1 1.3C2.1 9.2 1.4 13 1.7 16.7a16.6 16.6 0 0 0 5 2.5l1.100-1.800a10.800 10.800 0 0 1-1.700-.800l.4-.3a11.800 11.800 0 0 0 10.100 0l.4.3c-.5.3-1.100.6-1.700.8l1.100 1.800a16.600 16.600 0 0 0 5-2.500c.4-4.300-.7-8.100-3-11.400ZM8.700 14.500c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Zm6.600 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Z" />
        </svg>
        Join our Discord
      </a>
    </div>
  );
}
