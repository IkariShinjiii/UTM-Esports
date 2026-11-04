# UTM Esports

The website for **UTM Esports**, an independent esports organization. *United we are stronger.*

The site has one job: turn visitors from Facebook, Instagram and TikTok into **Discord members** and **tryout applicants**, and show that the org is real.

**Live site:** https://utm-esports.vercel.app

---

## Contents

- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing the content](#editing-the-content)
- [Working on the site](#working-on-the-site)
- [Deployment](#deployment)
- [Project docs](#project-docs)
- [Open items](#open-items)
- [Team](#team)

---

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router), static export (`output: "export"`) |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Fonts | Kanit (display) and Barlow (text), through `next/font` |
| Hosting | Vercel |
| CI | GitHub Actions |
| Node | 26.x (LTS) |

There is no database and no backend. Applications and partner enquiries go to Google Forms.

---

## Getting started

You need Node 26 and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (writes the static site to `out/`) |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Typecheck |

Run `npm run lint`, `npx tsc --noEmit` and `npm run build` before opening a pull request. CI runs the same three.

> npm prints an engines warning if you use a Node version other than 26. It does not block anything.

---

## Project structure

```
src/
  app/
    page.tsx              Home page: the sections in order
    about/                About page (mission, vision, story)
    teams/[game]/         One page per game
    results/[slug]/       One page per result (poster or certificate)
    layout.tsx            Fonts, metadata
    globals.css           Colours, textures, animations
  components/
    HeroMark.tsx          The hero page (the dragon)
    Hero.tsx              The picture shuffle section under it
    HeroSlides.tsx        The picture shuffle itself
    Nav.tsx               Top bar and phone menu
    Sections.tsx          Results, Join, Teams, Highlights, Community, Partners, FAQ, Footer
    NextEvent.tsx         Next event with a countdown
    StickyDiscord.tsx     Discord button fixed to the bottom on phones
  content/
    site.ts               All the content (edit this one)
    types.ts              The shape of that content
public/images/            Photos, award posters, jerseys, game art, logos
.github/workflows/        CI
```

---

## Editing the content

Everything the org edits lives in one typed file: [`src/content/site.ts`](src/content/site.ts). No other code needs to change to update it.

| Section | What it holds |
| --- | --- |
| `settings` | Links (Discord, forms, socials), contact email, whether tryouts are open |
| `heroSlides` | Pictures in the hero picture shuffle |
| `about` | Story, mission, vision and the tryout steps |
| `moments`, `faq` | Photo moments and the FAQ |
| `games`, `teams` | The games the club plays and its teams. Add a game by adding entries, not code |
| `achievements` | Results, newest shown first. Each can have a poster or certificate image |
| `events` | The next event (drives the countdown) |
| `sponsors`, `merch` | Partner logos and merch |

**Images** go in `public/images/`. Use `.webp`, keep them as small as you can, and keep the first load of the page under 1 MB.

**Placeholders** are marked `REPLACE_ME`. Search the file for it to find what still needs a real value.

---

## Working on the site

`main` is the live site, so changes go through a pull request:

1. Create a branch from `main`.
2. Make your change and push the branch.
3. Open a pull request into `main`.
4. CI runs (lint, typecheck, build) and Vercel builds a preview of your branch.
5. Get **1 approval** from a teammate, then merge.

Merging to `main` deploys to production automatically.

### Quality bar

- First load under 1 MB, not counting video
- WCAG 2.2 AA, visible keyboard focus, reduced motion respected
- Mobile first: most visitors are students on phones
- Show only real things: real photos, players and results. Do not invent sponsors, events or placements

---

## Deployment

The Vercel project `utm-esports` is connected to this repository.

| What | Result |
| --- | --- |
| Pull request | Preview deployment (behind Vercel login) |
| Merge to `main` | Production deployment at https://utm-esports.vercel.app |

[`vercel.json`](vercel.json) sets the Next.js preset, and `engines` in [`package.json`](package.json) pins Node 26.

Vercel refuses to deploy a vulnerable Next.js version, so keep `next` up to date within its minor version.

---

## Project docs

| File | What it covers |
| --- | --- |
| [`PRODUCT.md`](PRODUCT.md) | Who the site is for, its purpose, constraints and brand commitments |
| [`DESIGN.md`](DESIGN.md) | The visual system: colours, type, layout, shapes |

---

## Open items

- Real values for the `REPLACE_ME` placeholders in `site.ts`: the tryout form, the partner form, the contact email, the privacy page and the next event
- The real tryout process and FAQ answers (the current text is a holding version)
- Consent for the photos on the site, and privacy wording for applicants under 18 (Philippine Data Privacy Act, RA 10173)
- Analytics: buttons already carry `data-track` names, but no analytics script is installed yet
- Link previews and favicon: no Open Graph image, sitemap or robots file yet, and the favicon is still the Next.js default
- A custom domain
- `DESIGN.md` still describes slanted boxes, but the site now renders plain rectangles

---

## Team

| Name | Role |
| --- | --- |
| Xander | Scrum Master, content |
| Deghne | Frontend |
| Kervin | Deployment, analytics, quality |

Plan: Sprint 0 on Nov 4 to 6, 2026, then three two-week sprints. Launch target: **Dec 18, 2026**.
