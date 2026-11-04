"use client";

import { useState } from "react";
import type { Moment } from "@/content/types";

// A highlight: a photo, or a clip that only loads when a visitor taps play (keeps the page light).
export function ClipTile({ m }: { m: Moment }) {
  const [playing, setPlaying] = useState(false);

  if (m.videoUrl && playing) {
    const src = m.videoUrl + (m.videoUrl.includes("?") ? "&" : "?") + "autoplay=1";
    return (
      <iframe
        src={src}
        title={m.title}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={m.image}
      alt={m.alt}
      loading="lazy"
      width={1920}
      height={1080}
      className="aspect-video w-full object-cover"
    />
  );
  if (!m.videoUrl) return img;

  return (
    <button type="button" onClick={() => setPlaying(true)} aria-label={`Play the clip: ${m.title}`} className="relative block w-full">
      {img}
      <span className="absolute inset-0 grid place-items-center">
        <span className="cut-btn grid h-14 w-20 place-items-center bg-white text-track">
          <svg aria-hidden viewBox="0 0 24 24" className="size-7" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
