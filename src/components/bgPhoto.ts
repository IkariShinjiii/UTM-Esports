import type React from "react";
import { content } from "@/content/site";

// A faint photo behind a section, in place of the dragon, when one is set in content.sectionPhotos.
// Greyscale and low opacity so it stays texture: type always reads first.
export function bgPhoto(id: string, opacity = 0.2): React.CSSProperties | undefined {
  const src = content.sectionPhotos?.[id];
  if (!src) return undefined;
  return {
    "--ghost-img": `url("${src}")`,
    "--ghost-size": "cover",
    "--gpos": "center",
    "--gop": opacity,
    "--ghost-filter": "grayscale(1) contrast(1.1)",
  } as React.CSSProperties;
}
