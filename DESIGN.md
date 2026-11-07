---
name: UTM Esports
description: A red-and-black field built from the UTM dragon, set in heavy italic type, with plain rectangular boxes and the dragon kept behind the content.
colors:
  flame-red: "#e4181e"
  track-red: "#d4232b"
  cut-red: "#b3151b"
  crimson: "#6b0f12"
  warm-ink: "#16090a"
  card-ink: "#241214"
  well-ink: "#12080a"
  slash-white: "#ffffff"
  blush: "#f3ebe8"
typography:
  display:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    letterSpacing: "0.025em"
rounded:
  none: "0px"
spacing:
  rise: "clamp(28px, 5vw, 72px)"
  button-height: "56px"
  gutter: "24px"
  gutter-wide: "48px"
components:
  button-primary:
    backgroundColor: "{colors.slash-white}"
    textColor: "{colors.track-red}"
    rounded: "{rounded.none}"
    typography: "{typography.label}"
    padding: "0 56px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.slash-white}"
  card:
    backgroundColor: "{colors.card-ink}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "16px"
  placement-champion:
    backgroundColor: "{colors.track-red}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "4px 16px"
  countdown-cell:
    backgroundColor: "{colors.track-red}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "32px 4px"
---

# Design System: UTM Esports

## Overview

**Creative North Star: "Cut Through"**

The system is the UTM dragon scaled up to a page. A red field takes the logo's gradient (deep crimson at top left to bright red at bottom right). Black slabs and white slabs alternate with it. Type is heavy, uppercase, italic and tightly set, leaning like the wordmark. Every box (buttons, cards, tiles, plates, photo frames) is a plain rectangle: the sheared and slanted shapes of the first build were removed at the club's request and must not come back.

The dragon appears in three ways: as a poster-scale ink silhouette on the hero (which moves very slightly, see Motion), as a faint ghost behind each section (tinted white on red, red on black, ink on white), and as the red mark in the footer's corner. It is only ever behind content. Sections stack with a shallow diagonal top edge (about 3 to 4 degrees) that overlaps the section above; that edge is the one remaining diagonal in the system.

Calm is a requirement. Big type overwhelmed early visitors, so section headings are modest, cards are quiet, and red is reserved for championships, primary actions and the active state.

**Key Characteristics:**
- Red field, warm-black slabs, white slabs. Nothing else.
- Plain rectangles with zero border radius everywhere.
- Heavy italic display type for headings and names; plain Barlow for everything read.
- The dragon is background only, faint, and never over content.
- Real photos, real logos, real results. Nothing invented.

## Colors

One red family from the logo's gradient, a warm near-black with two darker plate shades, and white.

### Primary
- **Flame Red** (#e4181e): the bright end of the field gradient.
- **Track Red** (#d4232b): the working red. Text and buttons on white, countdown cells, the champion tag, `h3` accents, focus ring, text selection, the scroll progress bar at the top of the window.
- **Cut Red** (#b3151b): the gradient midpoint; exists only inside the field.
- **Crimson** (#6b0f12): the deep end of the field gradient.

### Neutral
- **Warm Ink** (#16090a): body text and dark slabs. Reddish-black, never `#000`. Token `ink`.
- **Card Ink** (#241214): a card or plate on an ink slab (result cards, player cards, org boxes). Token `card`.
- **Well Ink** (#12080a): the dark well a poster or photo sits in. Token `well`.
- **Slash White** (#ffffff): light slabs, the primary button, text on red and ink.
- **Blush** (#f3ebe8): the hover fill of the More menu (the page scrollbar is hidden; a 3px progress bar replaces it). Token `blush`.

### Named Rules
**The One Gradient Rule.** The red field is a 135 degree gradient, Crimson 0%, Cut Red 45%, Flame Red 100%. It appears only as `.field`. Never on a card or a button.

**The Warm Ink Rule.** Dark ground is `#16090a`, never `#000`.

**The Inverted Button Rule.** Buttons are white with Track Red text on red or ink ground and flip on hover. A red button on a red field is never used.

**The Red Is Earned Rule.** Red marks a championship, a primary action or the active item. Other placings, secondary text and chrome stay white or grey.

## Typography

**Display Font:** Kanit (700 and 800, italic only)
**Body Font:** Barlow (400, 500, 600, 700)

### Hierarchy
- **Display** (800 italic uppercase, clamp(3.25rem, 9vw, 6rem)): the hero headline only.
- **Headline** (800 italic uppercase, clamp(2rem, 4.4vw, 3.25rem)): every section `h2`. Page titles are a little smaller, clamp(2.25rem, 4.4vw, 3.5rem).
- **Title** (700 italic uppercase, 1.125rem to 1.5rem): card titles, tile names, box titles, caption titles.
- **Numerals** (800 italic): countdown digits, step numbers.
- **Body** (Barlow 400, 1.125rem, 1.5, max 34 to 60ch, `text-wrap: pretty`): paragraphs.
- **Label** (Barlow 700, uppercase, 0.025em tracking): buttons and nav links.

### Named Rules
**The Lean Rule.** Display type is never upright and never lowercase. The only upright text is Barlow.

## Layout

Content sits in a 90rem container with 24px gutters on phones and 48px from 768px. The home page runs top to bottom: hero (the dragon, headline, a looping bar of game and partner logos), the finish line (championships), join, teams, next event, the picture shuffle, highlights, community, partners, FAQ, footer. The nav lists the same order: Results, Teams, Events, Highlights, and a More menu (Community, Partners, FAQ, Our CEO, Organization, About). Phones get a menu button and a fixed Discord button at the bottom.

Spacing is on a scale: text under a heading 1rem, heading to content 2.5rem, button after text 2rem, blocks 4rem. Page headers use `pt-10 md:pt-14`.

Other pages: About (mission, vision, story), CEO (photo and one button to About), Organization (the org chart, top to bottom), Results (every placing, championships first), a page per game, and a page per result.

## Elevation & Depth

Mostly flat. Depth comes from the overlap of sections, the ghost dragon and faint textures. The exceptions are small, soft and tied to interaction: buttons and tiles lift 2px with a soft shadow on hover, and the More menu has a drop shadow. Focus is a 3px outline with 4px offset (Track Red on light, white on dark).

### Named Rules
**The Behind-Only Rule.** Ghost and texture layers sit at `z-index: -1` in an isolated stacking context. They never cover content or take pointer events.

## Shapes

Plain rectangles. No rounded corners, no skew, no clip-paths on boxes. Section tops keep the shallow diagonal. Photos and posters are shown whole: the jersey graphics are never cropped, and posters sit in a Well Ink square with `object-contain`.

## Components

### Buttons
- 56px tall, 56px side padding, white fill with Track Red text; flips to ink or red on hover. A 2px lift and soft shadow on hover.
- **Sticky Discord (phones):** ink with white text, fixed bottom center, hidden from 768px.
- **Text link:** uppercase bold, 2px underline, underline removed on hover.

### Game tiles
Ink rectangles with the character art fading in from the right. On hover or focus a red panel sweeps in from the left behind the text and art, and sweeps out to the right on leave (GSAP, moving by position so quick in-and-out never jumps).

### Hero dragon
Sized to the area above the logo bar, so the whole head, the jaw and mouth, and the mane show and the bar never cuts it off. On phones it sits at the bottom right with the face below the Join button.

The mark is cut by `scripts/cut-dragon.mjs` into a head and a mane of six horizontal strips, each strip a root piece and a tip piece (13 images, `dragon-head`, `dragon-m0r` to `dragon-m5t`, about 120 kB), plus the small ink patch `dragon-eye` over the eye cut-out. Every pixel's opacity is shared between the layers so that stacked they equal the original (checked to within 3 of 255) and so strips moving a little never leave a gap. The head and mane meet in the empty red gap beside the horn and in solid dark further down, never through a flame. The generated placement is in `src/components/dragonLayers.ts`. If the mark is ever redrawn, run the script again. The mouth is a cut-out in the silhouette, not a separate jaw, so it is not animated; a moving jaw needs the artwork redrawn with the jaw as its own piece.

### Logo bar
Under the hero. A looping strip of the five game logos (each opens its page), a divider, then the partners in light versions (CDG Solutions, Nbrims, each linking out). Every logo has the same height and side space. It slows to a stop on hover, focus or touch-hold, and has a Pause button that appears only for keyboard users. With reduced motion it does not move: it becomes a row the visitor scrolls.

### Picture shuffle
Pictures swipe sideways on their own every 3 seconds (GSAP), with the photo gliding a little slower than its frame. They can be dragged. There is no visible pause button; a Pause button appears for keyboard users only. With reduced motion it starts paused and the dots change the picture without sliding.

### Loading skeleton
A picture that loads late (below the fold) sits on a dark block with a slow light band passing over it (`SkelImg`, `.skeleton`), so a slow connection shows a placeholder, not a gap. The band holds still with reduced motion. Pictures that load with the page do not use it.

### Result cards
Card Ink plate: placement and date, the poster in a Well Ink square, the event title, one grey line (game and team). Only a Champion gets the red tag. The home page shows the championships; the Results page shows every placing.

### More menu
A light square panel with a red top edge and a short drop-in (GSAP; none with reduced motion). It opens when a mouse hovers More and closes a beat after the pointer leaves, and the gap under the button is part of the hover area so the pointer can reach the list. Touch and keyboard open it with the button. Closes on Escape, outside click or when focus leaves.

### Footer
A checkered finish-line strip, a join bar, four link columns (Play, Watch, Connect, Partners), the logo, and the publisher credit, with the red dragon cropped in the bottom-right corner.

### Org chart
Card Ink boxes joined by straight 3px lines: CEO (red title), admins, three groups side by side, then the MLBB division. People can carry a TikTok link.

### Back button and skip link
The Back button goes back by the site's own history (`NavHistory` remembers the pages opened in this tab), so it returns to the page the visitor was on, with its scroll position, even when they arrived from another site. With no earlier page of ours it opens a sensible fallback (the home page, the section, or the Results list) without reloading. Every page starts with a "Skip to content" link, visible only when it takes keyboard focus, that jumps past the menu to the page's first block (`id="content"`).

### Icon and link preview
The favicon is the dragon in white on the red field gradient, as a vector (`icon.svg`, with `apple-icon.png` and `favicon.ico` made from it). The link preview picture (1200 by 630) is the ink dragon on the field beside the logo and the motto.

### Textures
- **tex-dark:** hexagon mesh plus film grain on ink slabs.
- **tex-red:** speed lines taken from the Crimson Cloudburst jersey graphic, plus grain, on the red field.
- **tex-light:** a whisper of ink grain on white.

### Scroll reveal
Blocks below the fold rise 32px and fade in over about 1.1 seconds when first scrolled into view; list items stagger. Anything on screen at load is never hidden, and with no JavaScript nothing is hidden.

## Motion

Motion is on purpose and limited: the first-visit intro, the hero dragon, the picture shuffle, the logo bar, the tile wipe, the More menu drop, the loading skeleton and the scroll reveal. All of it uses transform and opacity (the eye blink uses a small clip), and all of it respects the reduced-motion setting.

- **Hero dragon:** meant to be felt more than seen, like a flying dragon in a headwind.
  - The whole mark drifts slowly (8.5 s) and breathes (4.8 s): the head rises and settles with a hair of scale.
  - The mane ripples. Each of the six strips turns about 0.5 to 0.8 degrees about its root on its own beat and with its own head start or lag, and each tip turns about 1.2 degrees on a slightly different beat, so a wave runs through the flames and the tips trail their roots.
  - About every 11 seconds a gust leans the whole mane back a touch (under 1 degree, a 1% stretch) and lets it go.
  - The eye blinks at uneven moments on a 13.7 s cycle: a blink, a double blink, a blink. Closing is quicker than opening.
  - Cycle lengths differ so the motion never repeats in step.
- **First-visit intro (once per session, `?intro` replays it):** a warm-ink screen where the white logo rises in and a light sweeps across it. The dragon breathes flat flame blades out of its mouth, then the flames snap back, the logo flies up into the nav and the screen lifts away (GSAP, about 3.5 s).
  - The fire follows the site's own rules: flat, hard-edged shapes in Cut Red, Flame Red and white, drawn like the flames in the logo's mane. No blur, no glow, no yellow or orange.
  - Six blades fan out of the mouth, longest underneath, each made of three nested layers that flicker on their own beat. Each blade is one small element moved with transforms only.
  - It is skipped for reduced motion and for repeat visits in the same tab.
- **Reduced motion:** the intro is skipped, the dragon holds still (every layer), the picture shuffle starts paused, the logo bar becomes a scrollable row, the skeleton band stops, the menu drop is skipped, and the scroll reveal keeps only a plain fade.
- The shuffle and logo bar also pause on hover, focus and touch-hold, and offer a Pause button for keyboard users.

## Do's and Don'ts

### Do:
- **Do** keep every box a plain rectangle.
- **Do** set display type in Kanit 800 or 700 italic uppercase.
- **Do** keep ground to three states: red field, Warm Ink, white.
- **Do** keep the dragon and textures behind content, faint and non-interactive.
- **Do** show real photos, logos and results only.
- **Do** keep the first load under 1 MB: use the light copies (ghost dragons, poster thumbnails, gallery photos). Measure it before adding images.
- **Do** give anything that moves on its own a reduced-motion version.

### Don't:
- **Don't** bring back skewed or sheared boxes, slashes over photos, or rounded corners.
- **Don't** use red for anything except championships, primary actions and the active item.
- **Don't** crop a jersey graphic or a certificate.
- **Don't** put the dragon over text, cards or buttons.
- **Don't** make the dragon's motion bigger or faster; if it is noticed as an animation, it is too much. Check any change at the real amplitudes, with neighbouring strips moving opposite ways, for cracks and stepped flames.
- **Don't** invent results, sponsors, quotes or biographies. Leave a field out until it is real.
