// The address the site is served from. Link previews, robots.txt and the sitemap use it for full URLs.
// Set NEXT_PUBLIC_SITE_URL in Vercel when a custom domain is connected.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://utm-esports.vercel.app").replace(/\/$/, "");
