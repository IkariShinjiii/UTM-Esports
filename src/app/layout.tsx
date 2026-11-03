import type { Metadata, Viewport } from "next";
import { Barlow, Kanit } from "next/font/google";
import { content } from "@/content/site";
import { Preloader } from "@/components/Preloader";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.search.indexOf("pre=1")>-1){sessionStorage.removeItem("utm-pre-seen")}else if(sessionStorage.getItem("utm-pre-seen")){document.documentElement.setAttribute("data-pre-skip","")}}catch(e){}`,
          }}
        />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
