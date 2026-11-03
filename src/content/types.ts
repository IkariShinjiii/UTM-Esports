// Typed content model. Everything the org edits lives in content/site.ts.
// Keyed by game so adding a title means adding entries, not changing code.

export type GameId = "mlbb" | "wildrift" | "valorant" | "lol" | "hok" | (string & {});

export interface Player {
  ign: string;
  role?: string;
  photo?: string;
  captain?: boolean;
  socials?: { label: string; url: string }[];
}

export interface Team {
  game: GameId;
  name: string;
  status: "active" | "recruiting" | "planned";
  players: Player[];
  applyUrl?: string; // optional form for this game; falls back to settings.applyFormUrl
}

export interface Achievement {
  title: string;
  placement: string;
  event: string;
  date: string; // ISO date
  game?: GameId;
  team?: string; // which UTM team earned it
  note?: string; // one short line of context
  image?: string; // poster or certificate under /images/awards
  imageAlt?: string;
}

export interface EsportsEvent {
  title: string;
  game?: GameId;
  start: string; // ISO date-time with offset, e.g. 2026-12-05T14:00:00+08:00
  streamUrl?: string;
}

export interface Sponsor {
  name: string;
  logo?: string;
  tier?: string;
  url?: string;
}

export interface MerchItem {
  name: string;
  price: number; // PHP
  photo?: string;
  orderUrl: string; // Messenger or Google Form
}

export interface SiteSettings {
  orgName: string;
  tagline: string;
  discordInvite: string;
  applyFormUrl: string;
  partnerFormUrl: string;
  contactEmail: string;
  privacyUrl: string;
  recruitingOpen: boolean;
  social: { facebook: string; instagram: string; tiktok: string; discord: string };
}

export interface Moment {
  image: string; // path under /images
  alt: string;
  title: string;
  caption: string;
  videoUrl?: string; // optional embed URL; the clip loads only when a visitor taps play
}

// One picture in the hero shuffle. A caption is written on the picture itself unless showCaption is false.
export interface HeroSlide {
  image: string; // path under /images
  mobileImage?: string; // optional crop used below 768px
  alt: string;
  title: string;
  caption?: string;
  positionMobile?: string; // CSS object-position, e.g. "50% 30%"
  positionDesktop?: string;
  showCaption?: boolean; // false when the picture already carries its own title, like the jersey graphics
}

export interface About {
  story: string; // short club story shown under mission and vision
  mission: string;
  vision: string;
  steps: { title: string; text: string }[]; // how tryouts work
}

export interface Faq {
  question: string;
  answer: string;
}

export interface SiteContent {
  settings: SiteSettings;
  about: About;
  heroSlides: HeroSlide[];
  moments: Moment[];
  faq: Faq[];
  games: Record<string, string>; // GameId -> display name, in the order the tiles appear
  gameShort?: Record<string, string>; // GameId -> short mark shown large on its tile
  sectionPhotos?: Record<string, string>; // section id -> image path; shown faintly behind that section instead of the dragon
  gameLogo?: Record<string, string>; // GameId -> logo image path (transparent, shown at the top of the game page)
  gameHeaderPosition?: Record<string, string>; // GameId -> CSS background-position of its art in the game page header
  gameArtPosition?: Record<string, string>; // GameId -> CSS object-position for its art, to keep the character in frame
  gameArt?: Record<string, string>; // GameId -> optional image path under /images for its tile
  teams: Team[];
  achievements: Achievement[];
  events: EsportsEvent[];
  sponsors: Sponsor[];
  merch: MerchItem[];
}
