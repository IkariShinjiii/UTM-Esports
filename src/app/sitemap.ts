import type { MetadataRoute } from "next";
import { content } from "@/content/site";
import { resultSlug } from "@/content/slug";
import { siteUrl } from "@/content/siteUrl";

export const dynamic = "force-static"; // the site is exported as static files

// Every page of the site: the fixed pages, one per game, and one per result that has a poster or certificate.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/ceo", "/organization", "/results", "/highlights", "/merch"];
  const games = Object.keys(content.games).map((id) => `/teams/${id}`);
  const results = content.achievements.filter((a) => a.image).map((a) => `/results/${resultSlug(a)}`);
  return [...pages, ...games, ...results].map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    priority: path === "/" ? 1 : 0.7,
  }));
}
