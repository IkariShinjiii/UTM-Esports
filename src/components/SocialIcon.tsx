// The four social icons, drawn as simple one-color shapes that take the text color.
const PATHS: Record<string, string> = {
  discord:
    "M19.3 5.3A16.5 16.5 0 0 0 15.2 4l-.2.4a15 15 0 0 0-6 0L8.8 4a16.5 16.5 0 0 0-4.1 1.3C2.1 9.2 1.4 13 1.7 16.7a16.6 16.6 0 0 0 5 2.5l1.1-1.8a10.800 10.800 0 0 1-1.700-.800l.4-.3a11.800 11.800 0 0 0 10.100 0l.4.3c-.5.3-1.100.6-1.700.8l1.100 1.800a16.600 16.600 0 0 0 5-2.500c.4-4.300-.7-8.100-3-11.400ZM8.700 14.500c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Zm6.600 0c-1 0-1.800-.9-1.800-2s.8-2 1.800-2 1.800.9 1.800 2-.8 2-1.800 2Z",
  facebook:
    "M22 12a10 10 0 1 0-11.600 9.900v-7H7.900V12h2.500V9.800c0-2.500 1.500-3.900 3.800-3.900 1.100 0 2.200.2 2.200.2v2.500h-1.300c-1.200 0-1.600.8-1.600 1.600V12h2.800l-.4 2.900h-2.300v7A10 10 0 0 0 22 12Z",
  tiktok:
    "M16.600 3a5 5 0 0 0 4 4.400v3.100a8 8 0 0 1-4-1.200v6.100a6 6 0 1 1-6-6c.3 0 .6 0 .9.1v3.200a3 3 0 1 0 2.100 2.800V3h3Z",
};

export function SocialIcon({ name, className = "size-7" }: { name: string; className?: string }) {
  const key = name.toLowerCase();
  if (key === "instagram") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d={PATHS[key] ?? PATHS.discord} />
    </svg>
  );
}
