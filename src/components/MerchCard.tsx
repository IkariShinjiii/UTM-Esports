"use client";

import { useState } from "react";
import type { MerchItem } from "@/content/types";

// A jersey standing above the top edge of its card. Hover shows the back; on touch screens and with the
// keyboard, the picture is a button that flips between front and back. Both views are whole and uncropped.
export function MerchPhoto({ m }: { m: MerchItem }) {
  const [back, setBack] = useState(false);
  const [hover, setHover] = useState(false);
  const showBack = back || hover;
  const img = "col-start-1 row-start-1 h-72 w-auto max-w-none transition-opacity duration-300 md:h-80";
  return (
    <button
      type="button"
      onClick={() => setBack((v) => !v)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={back}
      aria-label={`${m.name}: showing the ${showBack ? "back" : "front"}. Press to flip.`}
      data-track="merch_flip"
      className="relative z-10 mx-auto -mb-24 -mt-24 grid cursor-pointer place-items-center drop-shadow-[0_14px_22px_rgb(0_0_0/0.5)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={m.photo} alt="" width={m.width} height={m.height} loading="lazy" className={`${img} ${showBack ? "opacity-0" : "opacity-100"}`} />
      {m.backPhoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={m.backPhoto}
          alt=""
          width={m.width}
          height={m.height}
          loading="lazy"
          className={`${img} ${showBack ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </button>
  );
}
