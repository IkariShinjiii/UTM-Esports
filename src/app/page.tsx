import { Hero } from "@/components/Hero";
import { HeroMark } from "@/components/HeroMark";
import { Nav } from "@/components/Nav";
import { NextEvent } from "@/components/NextEvent";
import {
  Community,
  Faq,
  Footer,
  Highlights,
  Join,
  Partner,
  Results,
  Teams,
  wrap,
} from "@/components/Sections";
import { StickyDiscord } from "@/components/StickyDiscord";
import { content } from "@/content/site";

// Section order: hero page (the dragon), results, join, teams, next event, picture shuffle, highlights,
// community, partners, FAQ and about, footer.
export default function Home() {
  return (
    <>
      <Nav />
      <HeroMark />
      <main>
        <Results />
        <Join />
        <Teams />
        <NextEvent events={content.events} games={content.games} wrap={wrap} />
        <Hero />
        <Highlights />
        <Community />
        <Partner />
        <Faq />
      </main>
      <Footer />
      <StickyDiscord />
    </>
  );
}
