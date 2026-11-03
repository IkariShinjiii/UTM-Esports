---
name: UTM Esports
description: A red field cut by white knife slashes at the dragon's jaw angle, set in sheared heavy italic type.
colors:
  flame-red: "#e4181e"
  track-red: "#d4232b"
  cut-red: "#b3151b"
  crimson: "#6b0f12"
  warm-ink: "#16090a"
  slash-white: "#ffffff"
  scrollbar-blush: "#f3ebe8"
typography:
  display:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Kanit, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
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
  button-sticky:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "0 48px"
    height: "56px"
  countdown-cell:
    backgroundColor: "{colors.track-red}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "32px 4px"
  roster-name:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "12px 32px"
  caption-plate:
    backgroundColor: "{colors.warm-ink}"
    textColor: "{colors.slash-white}"
    rounded: "{rounded.none}"
    padding: "24px 64px"
---

# Design System: UTM Esports

## Overview

**Creative North Star: "Cut Through"**

The system is the UTM logo's own construction, scaled up to a page. A red field takes the logo's gradient (deep crimson at top left to bright red at bottom right). White knife slashes cut through it at 18 degrees, the angle of the dragon's jaw. Type is heavy, uppercase, italic and tightly set, leaning with the same shear. Everything that is a box (buttons, plates, countdown cells, roster names, photo frames) is a parallelogram, and the hero photo sits in a plain, uncropped frame (the user rejected slashes over the photo).

The page alternates three kinds of ground: the red field, warm-ink slabs, and white slabs. Sections stack with a shallow diagonal top edge that overlaps the section above. The horizontal section cuts are a shallow echo of the jaw angle, roughly 3 to 4 degrees (a 28 to 72px rise across the viewport width), while the true 18 degrees is reserved for buttons, countdown cells, roster plates and Moments frames. A dark-red ghost of the dragon mark sits behind each section, and faint textures drawn in code (grain, hex mesh, speed lines) keep flat color from feeling dead. The only automatic motion is the picture shuffle's crossfade, which can be paused and stops for reduced motion.

**Key Characteristics:**
- Red field with white slashes; red is carried by large areas, not sprinkled.
- One shear angle, 18 degrees (`--cut`), applied to every box and cut edge.
- Sheared heavy italic display type, uppercase, negative tracking.
- Zero border radius anywhere; silhouettes are parallelograms and diagonals.
- Flat: no box shadows; depth comes from overlap, ghost layer and texture.
- Textures are faint and always behind content.

## Colors

A single red family from the logo's gradient, a warm near-black, and pure white. Nothing else.

### Primary
- **Flame Red** (#e4181e): the bright end of the field gradient (bottom right).
- **Track Red** (#d4232b): the working red. Text and buttons on white, countdown cells, achievement plates, `h3` headings, focus ring, text selection, theme color, scrollbar thumb.
- **Cut Red** (#b3151b): the gradient midpoint at 45%; exists only inside the field.
- **Crimson** (#6b0f12): the deep end of the field gradient (top left).

### Neutral
- **Warm Ink** (#16090a): body text, and the dark slabs, caption plate, roster names and sticky button. Reddish-black, never neutral gray or pure black. Also the hero text shadow and photo scrim, as rgb(22 9 10) at alpha.
- **Slash White** (#ffffff): page ground, light slabs, primary button fill, text on red and ink.
- **Scrollbar Blush** (#f3ebe8): scrollbar track only.

### Named Rules
**The One Gradient Rule.** The red field is a 135 degree gradient, Crimson 0%, Cut Red 45%, Flame Red 100%. It appears only as `.field`, and only on the hero, Moments and Join. Never use it on a card or a button.

**The Warm Ink Rule.** Dark ground is `#16090a`, never `#000`. White-on-red text uses Track Red or darker; text sits on Flame Red only at large sizes.

**The Inverted Button Rule.** Buttons are white with Track Red text on red or ink ground, and flip to ink or red on hover. A red button on a red field is never used.

## Typography

**Display Font:** Kanit (700 and 800, italic only, with Arial Narrow, sans-serif)
**Body Font:** Barlow (400, 500, 600, with system-ui, sans-serif)

**Character:** Kanit at 800 italic is wide and forward-leaning like the UTM wordmark; Barlow stays plain so the display carries all the voice. Display is always uppercase and italic.

### Hierarchy
- **Display** (800 italic uppercase, clamp(3.25rem, 9vw, 6rem), 0.95, -0.02em): the hero headline only, with a soft ink text shadow over the photo.
- **Headline** (800 italic uppercase, clamp(3rem, 8vw, 6rem), 0.95, -0.02em): every section `h2`.
- **Title** (800 italic uppercase, 1.875rem to 2.25rem, 1, Track Red): `h3` inside light slabs (team names, mission, vision, story, results).
- **Sub-title** (700 italic uppercase, 1.5rem to 2.25rem, ~1 to 1.15): event title, caption title, moment titles, step titles.
- **Numerals** (800 italic, 3rem to 7.5rem+, tabular for the countdown): countdown digits, step numbers (6rem), placements (3rem to 3.75rem), roster names (clamp(1.75rem, 4.5vw, 3.25rem)).
- **Body** (Barlow 400, 1.125rem to 1.25rem, 1.5 or snug, max 34 to 48ch): paragraphs.
- **Label** (Barlow bold requested, uppercase, 0.025em tracking, 1.125rem): buttons and nav links.

### Named Rules
**The Lean Rule.** Display type is never upright and never lowercase. The only upright text is Barlow body copy.

**The Unskew Rule.** When a box is skewed (`.skew`), its content is wrapped in `.unskew` so the type is italic by choice, not distorted by the box.

## Layout

Content sits in a 90rem (1440px) container with 24px side gutters on phones and 48px from 768px. Sections are full-bleed slabs separated by shallow diagonal cuts. Each slab pulls up under the one above by `--rise` (`clamp(28px, 5vw, 72px)`) and clips its own top edge with `polygon(0 rise, 100% 0, ...)`; padding is rise plus 4rem (6rem from 768px) at top and rise plus 3rem (5rem) at bottom. That rise over the viewport width is only about 3 to 4 degrees; it is a deliberately shallow echo of the 18 degree jaw angle and must not be steepened to match it.

The hero is a two-part split on desktop (copy 5fr, plain 16:9 picture frame 7fr, centered vertically with no minimum height), stacked on phones: headline and button first, then the picture. A solid sticky nav bar (ink, 3px red bottom border) holds the logo, links, Discord and Join the squad; phones get a menu button. Moments uses a 3fr / 2fr / 2fr grid with staggered tops (0, 56px, 28px) from 768px. About is a two-column grid at 768px. Join is three steps divided by skewed 3px white rules. Section spacing is large and varied rather than uniform. Phones get a fixed Discord button at the bottom, and the footer reserves space for it (`pb-28`).

## Elevation & Depth

Flat. There are no box shadows. Depth is conveyed by overlap (each slab slides under the one above), by the dark-red ghost dragon layer (`background: url(/images/bg-dragon-mark.webp)`, 130% height, opacity 0.07 on white, 0.12 on ink via `--gop`, 0.45 with `multiply` on the red field), and by the faint textures. The one shadow in the build is a soft text shadow on the hero headline (`0 2px 28px rgb(22 9 10 / 0.45)`), used for legibility over the photo, not for depth. Focus is a 3px outline with 4px offset: Track Red on light, white on `.on-dark`.

### Named Rules
**The Behind-Only Rule.** Ghost and texture layers are `::before`/`::after` at `z-index: -1` inside an isolated stacking context. They never sit over content and never receive pointer events.

## Shapes

No rounded corners. The form language is the parallelogram and the diagonal.
- **Buttons** (`.cut-btn`): `polygon(18px 0, 100% 0, calc(100% - 18px) 100%, 0 100%)` on a 56px minimum height, about 18 degrees.
- **Plates** (`.cut-plate`): same cut with a 50px offset, used on the hero caption.
- **Photo frames** (`.slant`): `polygon(18% 0, 100% 0, 82% 100%, 0 100%)` on 16:9, about 18 degrees.
- **Skewed boxes** (`.skew` / `.unskew`): `skewX(-18deg)` via `--cut`, with content counter-skewed. Used for countdown cells, roster names, achievement placements.
- **Hero picture frame**: a plain `aspect-video` frame; pictures are shown whole (the jersey graphics are uncropped, full resolution), the caption is written on the picture over a bottom fade only where the picture has no title of its own, and the shuffle controls sit under the frame.
- **Section edges** (`.slab`): shallow diagonal, about 3 to 4 degrees, not 18.
- Borders appear only on the carousel controls (2px white at 40% alpha) and the step dividers (3px white, skewed).

## Components

### Buttons
- **Shape:** parallelogram, `.cut-btn`, 56px tall, 56px side padding, no radius.
- **Primary:** white fill, Track Red text, Barlow bold uppercase, 0.025em tracking, 1.125rem.
- **Hover / Focus:** fill changes to Warm Ink (hero, join) or Track Red (stream and partner) with white text; color transition only. Focus uses the global 3px outline.
- **Sticky Discord (phones):** `.cut-btn` in Warm Ink with white text and an inline Discord glyph, fixed bottom center, hidden from 768px.
- **Text link:** uppercase bold with a 2px underline, 8px offset; underline removed on hover.

### Countdown (signature)
Four `.skew` cells in a 4-column grid, Track Red fill, white Kanit 800 italic numerals (3rem, 4.5rem from 768px, tabular-nums) over a Barlow unit label. The row is `aria-hidden` with a screen-reader sentence alongside.

### Roster lineup
Players are `.skew` Warm Ink chips with white Kanit 800 italic names, wrapped in a flowing row with a 12 to 16px gap, indented 12px to absorb the lean.

### Caption plate and carousel controls
A Warm Ink `.cut-plate` with a Kanit 700 italic title, white caption, and 44px square controls with 2px 40%-white borders. Indicator bars are 6px tall: 24px wide white when active, 12px at 50% white otherwise.

### Result plates and steps
Placements sit in Track Red `.skew` plates beside event text. Join steps are huge Kanit numerals (6rem) with a title and short text, divided by skewed white rules.

### Textures
- **tex-dark:** hexagon mesh (white at 7% stroke) plus film grain, at 0.38 opacity, on ink slabs.
- **tex-red:** two sets of 108 degree speed lines (white at 10%, black at 14%) plus grain, at 0.4 opacity, on the red field.
- **tex-light:** a whisper of warm-ink grain on white, at 0.45 opacity.

## Do's and Don'ts

### Do:
- **Do** shear every box at 18 degrees (`--cut`, `.cut-btn`, `.cut-plate`, `.slant`, `.skew`) and keep section cuts shallow at about 3 to 4 degrees.
- **Do** set display type in Kanit 800 or 700 italic uppercase with -0.02em tracking.
- **Do** keep ground to three states: red field, Warm Ink (#16090a), white.
- **Do** use `.unskew` on content inside any `.skew` box.
- **Do** keep ghost and texture layers behind content, faint and non-interactive.
- **Do** honor `prefers-reduced-motion`: smooth scroll turns off, and the carousel does not autoplay.

### Don't:
- **Don't** round corners; there is no radius in this system.
- **Don't** add box shadows or glows for depth.
- **Don't** use pure black or gray neutrals; the darks are reddish ink.
- **Don't** steepen section cuts to 18 degrees or flatten buttons and plates to horizontal.
- **Don't** put the red field gradient on small components such as cards, chips or buttons.
- **Don't** use upright or lowercase display type.


## Results cards (documented exception)

The cards in "The finish line" are upright rectangles on a deep-red card tone (`#241214`, frame `#12080a`), not parallelograms and not skewed. They hold posters and certificates that must never be cropped or sheared, so only the placement plate above each image carries the 18 degree shear. The tone is used only for cards that hold a picture (also the player cards on game pages).
