import type { Metadata, Viewport } from "next";
import { Barlow, Kanit } from "next/font/google";
import { Analytics } from "@/components/Analytics";
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

export const metadata: Metadata = {
  title: `${content.settings.orgName} | ${content.settings.tagline}`,
  description:
    "UTM Esports is a student esports team. Apply for tryouts and join our Discord.",
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
        <Analytics />
      </body>
    </html>
  );
}
