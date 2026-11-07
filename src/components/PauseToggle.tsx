// The Pause / Play button for the two things on the home page that move by themselves (the picture shuffle and
// the logo bar). Always visible, a flat square with a white icon, and big enough to tap (44px).
export function PauseToggle({
  stopped,
  onToggle,
  label,
  track,
  className = "",
}: {
  stopped: boolean;
  onToggle: () => void;
  label: string; // what is being paused, e.g. "the picture shuffle"
  track?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${stopped ? "Play" : "Pause"} ${label}`}
      data-track={track}
      className={`grid size-11 place-items-center text-white transition-colors hover:bg-white/15 ${className}`}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
        {stopped ? <path d="M3 1.5 14 8 3 14.5z" /> : <path d="M3 1.5h3.5v13H3zM9.5 1.5H13v13H9.5z" />}
      </svg>
    </button>
  );
}
