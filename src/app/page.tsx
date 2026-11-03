import { Hero } from "@/components/Hero";
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

// Section order: hero, results, join, teams, next event, highlights, community, partners, FAQ and about, footer.
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <main>
        <Results />
        <Join />
        <Teams />
        <NextEvent events={content.events} games={content.games} wrap={wrap} />
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
