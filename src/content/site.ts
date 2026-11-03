import type { SiteContent } from "./types";

// TODO(T1 kickoff): replace every placeholder below with confirmed org details.
export const content: SiteContent = {
  settings: {
    orgName: "UTM Esports",
    tagline: "United we are stronger.",
    discordInvite: "https://discord.gg/sXs4hHxnt",
    applyFormUrl: "https://forms.gle/REPLACE_ME",
    partnerFormUrl: "https://forms.gle/REPLACE_ME",
    contactEmail: "REPLACE_ME@example.com",
    privacyUrl: "https://REPLACE_ME/privacy",
    recruitingOpen: true,
    social: {
      facebook: "https://www.facebook.com/UTM.ILO.Esports",
      instagram: "https://www.instagram.com/utm_esports/",
      tiktok: "https://www.tiktok.com/@utm.ilo.esports",
      discord: "https://discord.gg/sXs4hHxnt",
    },
  },
  heroSlides: [
    {
      image: "/images/20250329-095114.webp",
      mobileImage: "/images/hero-mobile.webp",
      alt: "Six UTM Esports players holding the club flag at a tournament",
      title: "Our first ever face-to-face tournament",
      caption: "Top 4 at NinjaPrint's 6th Anniversary MLBB Tournament",
      positionMobile: "50% 35%",
      positionDesktop: "50% 38%",
    },
    {
      image: "/images/jersey-crimson.webp",
      alt: "The UTM Esports Crimson Cloudburst jersey, front and back: black with a red dragon",
      title: "Crimson Cloudburst jersey",
      showCaption: false, // the graphic already carries its own title
    },
    {
      image: "/images/jersey-sakura.webp",
      alt: "The UTM Esports Sakura Blossom jersey, front and back: white and pink with a dragon",
      title: "The Sakura Blossom jersey",
      showCaption: false,
    },
  ],
  about: {
    story:
      "Our first ever face-to-face tournament ended in a Top 4 finish at NinjaPrint's 6th Anniversary MLBB Tournament. We are just getting started.",
    // Mission and vision: the org's own full text.
    mission:
      "To inspire and empower aspiring esports players by fostering a positive and inclusive environment. We are committed to encouraging growth, responsibility, and excellence within our community, helping individuals reach their full potential both locally and globally. As a behind-the-scenes leader, we use strategic influence to create a supportive and impactful organization, aiming to positively shape the esports industry for the greater good.",
    vision:
      "To build a worldwide esports organization that is recognized not only for its success but for its dedication to integrity, positivity, and community. We strive to inspire and empower players, while leading by example to show that success can be achieved through responsible gaming and collaborative effort. Our vision is to transcend national borders, creating an influential global presence that leads with purpose and integrity, shaping the future of esports and making a lasting impact on the world.",
    // TODO(T1): confirm the real tryout process with the org.
    steps: [
      { title: "Apply", text: "Fill in the tryout form with your in-game name, rank and role." },
      { title: "Meet us on Discord", text: "Join the server so the officers can reach you." },
      { title: "Try out", text: "Play with the squad and show what you can do." },
    ],
  },
  moments: [
    {
      image: "/images/20250329-095114.webp",
      alt: "The UTM Esports squad holding the club flag at a tournament",
      title: "Tournament day",
      caption: "The squad with the flag.",
    },
    {
      image: "/images/20250329-163540.webp",
      alt: "UTM Esports players watching a match on a projector",
      title: "Match watch",
      caption: "Following the bracket together.",
    },
    {
      image: "/images/20250703-164407.webp",
      alt: "UTM Esports members in red and pink jerseys outdoors",
      title: "Two kits",
      caption: "Crimson Cloudburst and Sakura Blossom.",
    },
  ],
  // FAQ: holding answers only. Replace with the org's confirmed eligibility, schedule and code of conduct.
  faq: [
    {
      question: "Who can apply?",
      answer: "UTM Esports is open to aspiring players who want to grow. Eligibility details are being confirmed; join our Discord to hear first.",
    },
    {
      question: "When are tryouts?",
      answer: "Tryout dates will be announced on our Discord and social pages.",
    },
    {
      question: "What is the code of conduct?",
      answer: "We are building a positive and inclusive team. The full code of conduct is being finalized.",
    },
  ],
  // The games UTM Esports plays or is building teams for. A game with no team in `teams` shows "Coming soon".
  games: {
    valorant: "Valorant",
    mlbb: "Mobile Legends: Bang Bang",
    hok: "Honor of Kings",
    lol: "League of Legends",
    wildrift: "League of Legends: Wild Rift",
  },
  gameShort: { valorant: "VAL", mlbb: "MLBB", hok: "HOK", lol: "LoL", wildrift: "WR" },
  // Game logos for the game pages. Trademarks of their publishers, used only to name the games UTM plays.
  // Mobile Legends has no clean logo file yet: add one at /images/games/mlbb.webp and list it here.
  gameLogo: {
    valorant: "/images/games/valorant.webp",
    hok: "/images/games/hok.webp",
    lol: "/images/games/lol.webp",
    wildrift: "/images/games/wildrift.webp",
  },
  // Faint photos behind a section, in place of the dragon. Put licensed images in public/images/bg/.
  // sectionPhotos: { events: "/images/bg/arena.webp", community: "/images/bg/keyboard.webp", partners: "/images/bg/stage.webp" },
  // Character art on each game tile, supplied by the org from the publishers' official sites:
  // Hush (Valorant), Ling (Mobile Legends), Di Renjie (Honor of Kings), Darius (League of Legends), Jinx (Wild Rift).
  // The art belongs to Riot Games, Moonton and Tencent; check their fan-content terms (see the footer credit).
  gameArt: {
    valorant: "/images/games/art/valorant.webp",
    mlbb: "/images/games/art/mlbb.webp",
    hok: "/images/games/art/hok.webp",
    lol: "/images/games/art/lol.webp",
    wildrift: "/images/games/art/wildrift.webp",
  },
  gameHeaderPosition: {
    valorant: "30% 20%",
    mlbb: "70% 22%",
    hok: "70% 25%",
    lol: "75% 20%",
    wildrift: "75% 25%",
  },
  gameArtPosition: {
    valorant: "8% 30%",
    mlbb: "50% 35%",
    hok: "72% 30%",
    lol: "85% 22%",
    wildrift: "78% 30%",
  },
  teams: [
    {
      game: "mlbb",
      name: "UTM Synctron",
      status: "active",
      players: [
        // Roles and captain to be confirmed by the org; order is not a ranking.
        { ign: "Kiyoshi" },
        { ign: "Dick Grayson" },
        { ign: "Baa Baa Black Reense" },
        { ign: "Kaitoo" },
      ],
    },
  ],
  // Results supplied by the org (from its Discord record and certificates). Newest is shown first.
  // Placement words are used as written: "Champion", "2nd place", "Top 4", "Quarterfinals".
  achievements: [
    {
      title: "Champion",
      placement: "Champion",
      event: "KSG's First Tourney",
      date: "2021-08-27",
      game: "valorant",
      image: "/images/awards/ksg-first-tourney.webp",
      imageAlt: "KSG's First Tourney 1st placer line-up for UTM",
    },
    {
      title: "Quarterfinals",
      placement: "Quarterfinals",
      event: "AGC MLBB Tournament", // TODO: confirm the exact tournament name
      date: "2022-08-11",
      game: "mlbb",
      team: "UTM Vongolia Prime",
      note: "Back after a year of hiatus.",
    },
    {
      title: "Champion",
      placement: "Champion",
      event: "Bandle Balentong Tournament",
      date: "2022-10-31",
      game: "wildrift",
      team: "UTM Astraeus",
      note: "The first championship for the org.",
      image: "/images/awards/bandle-balentong.webp",
      imageAlt: "Champion poster for UTM Astraeus at the Bandle Balentong Tournament",
    },
    {
      title: "Top 4",
      placement: "Top 4",
      event: "NinjaPrint's 6th Anniversary MLBB Tournament",
      date: "2025-03-29", // confirmed by the org; our first face-to-face tournament
      game: "mlbb",
      note: "Our first face-to-face tournament.",
      image: "/images/awards/ninjaprint-top4.webp",
      imageAlt: "Thank you poster for NinjaPrint's 6th Anniversary MLBB Tournament: the UTM squad holding the flag, 4th placer",
    },
    {
      title: "Top 4",
      placement: "Top 4",
      event: "Korum Clash: Tough Eight",
      date: "2025-06-09",
      game: "mlbb",
      note: "MLBB online tournament.",
      image: "/images/awards/korum-tough-eight.webp",
      imageAlt: "Korum Clash Tough Eight qualified team poster for UTM Esports",
    },
    {
      title: "Champion",
      placement: "Champion",
      event: "Respawn Point's First MLBB Mini Tournament",
      date: "2026-03-28",
      game: "mlbb",
      team: "UTM Zodiac Keepers",
      image: "/images/awards/respawn-point.webp",
      imageAlt: "Tournament bracket won by UTM Zodiac Keepers",
    },
    {
      title: "2nd place",
      placement: "2nd place",
      event: "Korum Clash MLBB Tournament S16",
      date: "2026-08-04",
      game: "mlbb",
      team: "UTM Synctron",
      image: "/images/awards/korum-s16.webp",
      imageAlt: "Certificate of Recognition: UTM Synctron, second place",
    },
    {
      title: "Champion",
      placement: "Champion",
      event: "Korum Clash MLBB Tournament S17",
      date: "2026-08-10",
      game: "mlbb",
      team: "UTM Zodiac Keepers",
      image: "/images/awards/korum-s17.webp",
      imageAlt: "Certificate of Recognition: UTM Zodiac Keepers, champion",
    },
  ],
  events: [
    // TODO: PLACEHOLDER event, replace with the real next event (or delete it to show the empty state).
    {
      title: "REPLACE_ME: next event name",
      game: "mlbb",
      start: "2026-12-18T14:00:00+08:00",
      streamUrl: "",
    },
  ],
  sponsors: [
    { name: "CDG Solutions", logo: "/images/partners/cdg-solutions.webp" },
    { name: "Nbrims", logo: "/images/partners/nbrims.webp" },
  ],
  merch: [],
};
