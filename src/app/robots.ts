import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/siteUrl";

export const dynamic = "force-static"; // the site is exported as static files

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
