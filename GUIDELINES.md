# Behavior Guidelines

How the portfolio behaves — not how it looks. For visual tokens see `docs/DESIGN.md`. For brand register see `.impeccable.md`. For coding conventions and session workflow see `CLAUDE.md`.

These are warmly-precise rules, not corporate "Never disable browser zoom" rules. Each one names a constraint and explains why it exists, so future-you (or a contributor) can make the right call on edge cases.

---

## Interactions

**Keyboard reaches everything.**
Every action a mouse can take, a keyboard can take too. Every interactive surface must be reachable via Tab and operable via Enter or Space. Why: this is the floor, not a feature — visitors who navigate by keyboard cannot complete the task otherwise.

**Focus is always visible.**
Every interactive element gets `focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2` (or a deliberately equivalent affordance). Why: WCAG 2.4.7. Don't disable the outline without replacing it. *Audit precedent: the Footer email button shipped without one and the audit caught it — a single missed ring is a P1.*

**Hit targets are at least 44×44px.**
Lightbox controls, nav buttons, footer icons — all must compute to ≥44×44px on touch devices. Padding counts; SVG size alone does not. Why: WCAG 2.5.8 and Apple HIG converge on 44pt; below that, motor-impaired users miss. On mobile, prefer larger.

**Links navigate; buttons do.**
If a click takes you to a URL, use `<Link>` or `<a>`. If it triggers an action without changing routes (copy email, open lightbox, toggle), use `<button>`. Why: assistive tech announces them differently and browser behaviors (right-click, middle-click, copy URL) only work on links.

**Modals are last resorts.**
The only modal on the site is the image Lightbox — and it earns it (image needs full-viewport real estate, has clear escape behavior). New modals get pushback before they ship. Why: modals interrupt; they break shareable URLs; they hide context. Most "I need a modal" feelings are actually "I need better page-level structure".

**Browser zoom stays on.**
Never set `user-scalable=no` or fix viewport scale. Why: visitors with low vision rely on zoom; refusing it locks them out.

---

## Motion

**Motion conveys state, not personality.**
A hover scale signals "this is interactive." A page-entrance fade signals "you've arrived." Animation that exists for delight alone is decoration, and decoration on a craft-portfolio reads as filler. Why: every motion frame the visitor watches is a frame they're not reading.

**Animate transform and opacity. Nothing else.**
No animations on `width`, `height`, `top`, `left`, `padding`, `margin`. Why: those properties trigger layout and paint; transform/opacity stay on the compositor and hold 60fps. The one shipped exception (`top: -0.75em` on `.citation-sup`) is a one-time mount calc, not an animation.

**Fast by default — 180ms to 220ms.**
Hover, focus, micro-affordances live in this band. Per `docs/DESIGN.md` Rule 5. The hero entrance is the documented exception at 560ms (`cubic-bezier(0.16, 1, 0.3, 1)`); it earns the time because it's a one-shot first-impression. Anything new should justify slower than 220ms in the PR description.

**`prefers-reduced-motion` is non-negotiable.**
Every CSS animation in `globals.css` has a reduced-motion fallback (12+ guards today). Every JS-driven animation must check `matchMedia("(prefers-reduced-motion: reduce)").matches` and return early. Why: vestibular triggers cause real physical discomfort; this is medical, not aesthetic.

**No bounce, no overshoot, no spring.**
Easing curves stay smooth-ease-out (`cubic-bezier(0.16, 1, 0.3, 1)` and family). Bouncy easing reads as toy-like and dates a product. Real objects decelerate; they don't recoil.

**Cursor-following overlays use always-mounted + attribute toggle, never @keyframes on conditional render.**
Per project memory `feedback_attribute_toggle_for_cursor_overlays`. When the wrapper has imperative cursor-tracking (`element.style.transform = translate3d(x, y, 0)` on mousemove), `@keyframes`/`@starting-style` on a conditionally-mounted child fires before the wrapper transform updates → animation plays at stale (0,0) and you never see it. Pre-stage the inner element in DOM at hidden state, toggle `data-visible="true"` on hover, animate via CSS `transition` on the attribute selector. Live use: `<HoverPreview />` (320ms entrance, see `docs/DESIGN.md` § Hover Preview Card).

**Hover is transform-only, never brightness or shadow.**
Per project memory: hover gets `scale`/`translate`. No `filter: brightness(...)`, no shadow brightening, no border-color flash. Why: brightness reads as cheap; transform reads as physical. The shipped Levitate hover (CaseStudyCard inner scales 0.97 over 320ms) is the canonical pattern.

**No transform on inline text — only surface-level cards/tiles.**
Per project memory `feedback_no_hover_scale_on_text`: never apply `hover:scale-*` to inline text links, text-only buttons, or labels. Subpixel rendering at non-1.0 scale factors thickens stroke edges via anti-aliasing — the eye reads it as a font-weight bump even though `font-weight` doesn't change. Cards and tiles are fine because their content is mostly raster (images) and the contextual movement masks the perceptual shift. Discovered via the Footer email button (session 45) — sibling text links used `link-underline` only and felt visually stable; the email button had a 1.01 scale and read as "weight changing" on hover.

---

## Accessibility

**Native semantics first; ARIA only as fallback.**
Use `<button>`, `<nav>`, `<main>`, `<article>`, `<section>` before reaching for `role=""`. ARIA is for the gaps native HTML can't fill. Why: native elements come with keyboard handling, focus management, and screen-reader announcements for free.

**Headings cascade. Don't skip levels.**
H1 → H2 → H3 with no jumps. One H1 per page (route-level). Why: assistive tech and SEO both lean on the heading tree as the document outline.

**Every image has a meaningful `alt`, or `alt=""` if decorative.**
Project images carry alt in `src/content/projects/*.yaml`. Decorative SVGs get `aria-hidden="true"`. Why: empty alt for decoration is a *positive* signal; missing alt is ambiguous and screen readers will read the filename.

**Focus management on the Lightbox is the gold standard.**
When the Lightbox opens, focus moves to the close button. When it closes, focus returns to the element that opened it. Tab cycles within the dialog (focus trap). Future modal-likes follow this pattern.

**Color contrast: AA minimum, AAA preferred for body.**
Current ratios on the light canvas: primary text 16.5:1, secondary 7.5:1, tertiary 5.0:1, citation link 7.4:1. All exceed AA. The playground card's dimmed text (`--playground-text-dim`, ~6.8:1) is the floor — never go below AAa for body-size text on the dark surface.

**Status-of-color-blind viewers is part of the test.**
The site is achromatic by design, so color-blindness is mostly a non-issue. The one exception: the `--accent-live` green status dot in the hero. It's paired with a pulse animation and the literal word "OPEN" — never relies on color alone to communicate state. Why: ~8% of men have some form of color-vision difference.

---

## Performance

**Static export, always.**
This is a personal portfolio. No SSR, no edge functions, no API routes. Every page is HTML at build time. Why: zero runtime cost for the visitor; instant TTFB from any CDN; no surprise bills.

**Images: explicit width/height, never `fill`.**
`next/image` static export breaks on the `fill` prop. Always pass concrete `width` and `height`. Why: prevents CLS and keeps the static export contract honest.

**Above-the-fold gets `priority`. Everything else lazy-loads.**
Hero image, landing nav — `priority`. Cards below the first viewport — default lazy. Why: LCP improves; bytes the visitor never sees never download.

**`audit-tokens.sh` is part of the deploy gate.**
Hardcoded colors, font sizes, and inline styles in `src/` fail the script. The script intentionally doesn't audit `globals.css` (that's the source of truth). Why: drift between code and tokens is the silent killer of design systems; the script catches it before merge.

**Font loading: Geist Sans and Mono only, via the `geist` package.**
No Google Fonts, no `<link rel="stylesheet">` for type, no second display face. Why: one network round-trip for two faces; the `geist` package handles `font-display` and FOIT/FOUT for us. Audit: verify `font-display: swap` is active under the package defaults if FOIT shows up in production.

**Core Web Vitals targets: LCP < 1.5s, CLS < 0.05, INP < 100ms.**
These are tighter than Google's "Good" thresholds (2.5s / 0.1 / 200ms) — the site's static-export architecture should hit them easily; if a deploy slips, something is wrong. Verify via PageSpeed Insights or `npx unlighthouse`.

---

## Content

**Em dashes are banned in user-facing copy.**
Page titles, MDX bodies, Keystatic content, tooltips, alt text, aria-labels — all em-dash-free. Replacements: colon for label/definition, period for two thoughts, comma for a pause, or restructure with a verb. Why: em dashes have become the single most reliable AI-prose tell since 2024; this audience notices instantly. *Scope clarification: code comments, this file, `CLAUDE.md`, `STATUS.md`, README, and `.claude/` skill files are NOT user-facing — em dashes welcome there. The card-headline format `<strong>{company}</strong> — {tagline}` is structural metadata, not prose, and is exempt.*

**Curly quotes for prose, straight quotes for code.**
`"like this"` in narrative passages and case-study bodies. `"like this"` only in code blocks and technical examples. Why: typographic correctness is a craft signal in itself.

**Non-breaking spaces glue paired terms.**
"UI / UX" → `UI&nbsp;/&nbsp;UX`. "30 sec" → `30&nbsp;sec`. "page 7" → `page&nbsp;7`. Why: a unit and its noun should never wrap to separate lines; it reads as broken.

**Microcopy uses verbs, never marketing nouns.**
"Read case study" not "Case Study" as a button. "View project" not "Project". "Open Reprio ↗" not "Reprio". Why: a button names what happens when you click it; the *thing* is already in the surrounding context.

**Hero chips are editorial blue with traveling-underline on hover.**
`#0946D7` (`--citation-link`) at rest, no rest underline. `.link-underline::after` 1px line traveling left-to-right on hover (320ms, `cubic-bezier(0.65, 0, 0.35, 1)`). On hover-capable devices, a 320×180 hover-preview card lands from below alongside the underline. On touch devices (`@media (hover: none)`), an inline ↗ glyph appears next to the chip text instead — direct navigation, no preview. Component: `<CitationLink>`. Scope: hero prose only. Don't reach for chip styling on body links elsewhere; use `.link-underline` on its own for those.

**Sacred copy: the case-study text is not editable.**
Case studies, project descriptions, hero prose — character-for-character what the author wrote. Microcopy (alt text, button labels, error states, 404, tooltips) is in scope for editing; everything else is not. Why: voice is the most fragile thing on a portfolio; one paraphrase erodes it.

---

## How these rules stay alive

This file is read by Claude during component work and by future contributors during onboarding. It's not a one-shot doc — when a new pattern emerges (a hover-scale invariant, a new accessibility decision), the rule lands here, in the right section, in the same voice.

Updates happen via the `/ship` Docs sync phase, never as a separate "remember to update GUIDELINES.md" task. Drift is enforced at the choke point.

Last updated alongside the audit that produced rules from real findings, not generic best-practice copy-paste. If a rule here doesn't have a real provocation behind it, delete it — guidelines that don't bite get ignored.
