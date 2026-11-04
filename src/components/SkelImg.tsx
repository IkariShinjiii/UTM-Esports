"use client";

import { useRef, useState } from "react";

// A picture with a skeleton behind it: a dark shimmering block that holds the picture's place until the picture
// has loaded (or failed), so a slow connection shows a placeholder instead of a gap. Use it for pictures that
// load late (below the fold); the pictures that load with the page do not need it. The shimmer is plain CSS
// (.skeleton in globals.css); it holds still for visitors who ask for reduced motion.
export function SkelImg({ className = "", alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [done, setDone] = useState(false);
  const seen = useRef(false);

  // A picture that finished loading before this script ran never fires onLoad, so check it once on mount
  const ref = (el: HTMLImageElement | null) => {
    if (el && !seen.current) {
      seen.current = true;
      if (el.complete) setDone(true);
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      alt={alt}
      onLoad={() => setDone(true)}
      onError={() => setDone(true)}
      className={`${className} ${done ? "" : "skeleton"}`}
      {...rest}
    />
  );
}
