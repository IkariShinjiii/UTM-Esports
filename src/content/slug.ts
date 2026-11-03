import type { Achievement } from "./types";

// URL slug for a result's own page, e.g. "korum-clash-mlbb-tournament-s17-2026-08-10".
export function resultSlug(a: Achievement): string {
  return `${a.event}-${a.date}`
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
