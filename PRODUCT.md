# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary: prospective players, mostly students and young players on phones, deciding whether to apply for tryouts. Also fans and community members who want to follow the team and join the Discord, and sponsors or partners considering support. School admins and parents may check legitimacy but were not named as a priority audience.

## Product Purpose
The landing page for UTM Esports, an independent esports organization. Its job is to turn social-media visitors (Facebook, Instagram, TikTok) into Discord members and tryout applicants, and to show the org is real. Success: more applications, more Discord joins, and credibility with partners.

## Positioning
UTM Esports is an inclusive place for aspiring esports players to grow, with responsibility and excellence. It is independent (not tied to ILO Esports) and competes in tournaments, starting with Mobile Legends: Bang Bang (team UTM Synctron).

## Operating Context
Static, database-free Next.js site (static export) hosted on Vercel. Content lives in one typed file (`src/content/site.ts`) edited by org volunteers. Applications and partner inquiries go to Google Forms, not the site. Team: Xander (Scrum Master, content), Deghne (frontend), Kervin (deployment, analytics, quality). Plan: Sprint 0 on Nov 4-6, 2026, then three two-week sprints, launch target Dec 18, 2026.

## Capabilities and Constraints
- Page weight budget under 1 MB on first load, excluding video; WCAG 2.2 AA; mobile-first.
- Content keyed by game so more games can be added without code changes.
- Roster: UTM Synctron (MLBB): Kiyoshi, Dick Grayson, Baa Baa Black Reense, Kaitoo. Roles and captain are unconfirmed and must not be shown yet.
- Open decisions: Discord invite, Google Form links, Facebook and Instagram URLs, real tryout process, domain, consent for photos.

## Brand Commitments
- Name: UTM Esports. Tagline: "United we are stronger."
- Logo: the UTM dragon (files in `D:\UTM Website\UTM Logo`; `UTM LOGO.png` is the clean 1280 px source, `UTM LOGO 2.png` is the dark background artwork).
- Mission and vision text come from the org's own graphic (`UTM Pictures/utm_mandv_final.jpg`).
- Binding visual constraint volunteered by the user: use `UTM LOGO 2.png` as a low-opacity site background that is not distracting.
- Jerseys: Crimson Cloudburst (red and black) and Sakura Blossom (pink and white).

## Evidence on Hand
Photos in `D:\UTM Website\UTM Pictures` (compressed copies in `public/images`): tournament day with flag, match watch, jersey shoots. Org chart and policy index exist. The user says real tournament results exist and will send them; until then, do not state any placements, trophies or rankings. Do not fabricate sponsors, events or testimonials.

## Product Principles
1. One job per page: move visitors to apply or join Discord.
2. Show only real things: real photos, real players, real results once supplied.
3. Content is edited by volunteers in one file; design must absorb changing content without breaking.
4. Phones first: fast, light, thumb-reachable actions.
5. Inclusive and welcoming tone, not exclusive or intimidating.

## Accessibility & Inclusion
WCAG 2.2 AA, visible keyboard focus, respect reduced-motion. Applicants may be under 18, so privacy and consent wording must be handled with the school's data protection officer (Philippine Data Privacy Act, RA 10173).
