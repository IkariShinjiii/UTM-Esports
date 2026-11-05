import type { Metadata } from "next";
import { PreloaderSamples } from "./PreloaderSamples";

// Preview only: five sample preloaders built with GSAP. Not linked from the site and kept out of search.
export const metadata: Metadata = { title: "Preloader samples", robots: { index: false, follow: false } };

export default function Page() {
  return <PreloaderSamples />;
}
