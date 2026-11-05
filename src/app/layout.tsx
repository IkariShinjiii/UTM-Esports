import type { Metadata, Viewport } from "next";
import { Barlow, Kanit } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { NavHistory } from "@/components/NavHistory";
import { ScrollProgress } from "@/components/ScrollProgress";
import { content } from "@/content/site";
import "./globals.css";

// Heavy italic display, wide and forward-leaning like the UTM wordmark; plain Barlow for text.
const display = Kanit({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["italic"],
});

const sans = Barlow({
  variable: "--font-sans-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// The address the site is served from, so link previews get full image URLs. Set NEXT_PUBLIC_SITE_URL when the
// custom domain is connected.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://utm-esports.vercel.app";
const description = "UTM Esports is a student esports team. Apply for tryouts and join our Discord.";

// The preview picture comes from opengraph-image.jpg and twitter-image.jpg in this folder; the icons from
// icon.svg, apple-icon.png and favicon.ico.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${content.settings.orgName} | ${content.settings.tagline}`,
  description,
  openGraph: {
    type: "website",
    siteName: content.settings.orgName,
    locale: "en_PH",
    description,
  },
  twitter: { card: "summary_large_image", description },
};

export const viewport: Viewport = {
  themeColor: "#d4232b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        {children}
        <NavHistory />
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  );
}
