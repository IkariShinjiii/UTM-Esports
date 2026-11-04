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
  logoOnDark?: string; // a version of the logo for dark backgrounds (dark parts made light)
  tier?: string;
  url?: string;
  blurb?: string; // one true sentence about what they do for the club. Left out until the partner agrees to it.
}

export interface MerchItem {
  name: string;
  photo: string; // front view with the background removed (transparent WebP)
  photoAlt: string;
  backPhoto?: string; // back view, shown on hover
  width: number;
  height: number;
  price?: number; // PHP. Left out until the org sets one: the page then says the price is coming soon.
  orderUrl?: string; // Messenger or Google Form. Left out until there is one: the page then points to Discord.
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

// One box of the org chart on the CEO page
// A person in the chart: just a name, or a name with a link to their TikTok
export type OrgPerson = string | { name: string; tiktok?: string };

export interface OrgGroup {
  title: string;
  subtitle?: string;
  names: OrgPerson[];
}

export interface Org {
  top: OrgGroup; // the CEO
  second: OrgGroup; // reports to the CEO
  third: OrgGroup[]; // report to the second level, side by side
  division: OrgGroup; // the first team on the page
}

export interface Ceo {
  name: string;
  title: string;
  photo: string; // path under /images
  photoAlt: string;
  intro?: string; // one line about him, shown under the name
  message?: string[]; // his own words, one string per paragraph
  motto?: string; // a closing line, shown on its own
}

export interface Moment {
  image: string; // path under /images
  alt: string;
  title: string;
  caption: string;
  width?: number; // the picture's pixel size, so the gallery can keep its shape while it loads
  height?: number;
  date?: string; // "YYYY-MM", from the file name or the photo's own date. Used to group photos on the Highlights page.
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
  link?: { label: string; href: string }; // an optional link shown under the answer
}

export interface SiteContent {
  settings: SiteSettings;
  about: About;
  heroSlides: HeroSlide[];
  ceo: Ceo;
  org: Org;
  moments: Moment[]; // the photos shown on the home page
  moreMoments: Moment[]; // more photos, shown on the Highlights page after the ones above
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
