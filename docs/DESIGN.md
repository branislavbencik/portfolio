# Design System (`DESIGN.md`)

## 1. Core Philosophy
This portfolio operates like a high-end architectural CAD tool or a technical blueprint. It uses a **Light Technical Canvas** as the native medium, where information density is managed through structural grid lines and a tactile, paper-like texture.

- **Achromatic Canvas:** The site is monochrome. Color appears only in the actual work screenshots.
- **Engineered Typography:** Geist Sans with controlled negative tracking creates a compressed, high-density look. Geist Mono is used strictly for metadata, tags, and technical labels.
- **Load-Bearing Borders:** Hard 1px `border-zinc-300` defines the grid. Borders are visible, intentional, and provide the primary structural definition.
- **Tactile Canvas:** The background uses a procedural SVG grain filter (4% opacity) to create an "embodied" paper feel.

---

## 2. Color Tokens

### Backgrounds (Contrast Layering)
- **Canvas Base (`bg-canvas`):** `#F9FAFB` (Zinc 50)
- **Surface Level 1 (`bg-surface-1`):** `#F4F4F5` (Zinc 100)
- **Surface Level 2 (`bg-surface-2`):** `#E4E4E7` (Zinc 200)
- **Identity Glows:** Soft `rgba` halos (10–15% opacity) behind primary case study cards using project-specific hex codes.

### Typography
- **Primary Text (`text-primary`):** `#18181B` (Zinc 900)
- **Secondary Text (`text-secondary`):** `#52525B` (Zinc 600)

### Structure, Borders & Radii
- **Borders:**
  - **Primary** — `--border-light` = Zinc 200 (default rest stroke; Figma "Border Light")
  - **Strong** — `--border-strong` = Zinc 300 (emphasized rest stroke; Figma "Border Strong"; reserved, no current consumer)
  - **Light Hover** — `--border-light-hover` = Zinc 400 / `#A1A1AA` (companion to `--border-light` for hover transitions on text-only tiles where the no-hover-scale-on-text rule blocks transform-only). Not yet in Figma — sync there before adopting beyond `DeliverablesBar`.
  - All three are CSS custom properties consumed via arbitrary-value syntax (`border-[var(--border-light)]`, `hover:border-[var(--border-light-hover)]`) and intentionally **not** exposed through `@theme inline` to keep the Tailwind utility namespace clean.

- **Radii Rule:**
  - Layout surfaces: `rounded-none` (0px)
  - Interactive elements only: `rounded-[2px–4px]`

---

## 3. Typography Scale

Built on **Geist Sans** and **Geist Mono**, with **VC Honey** (serif) reserved for voice-tier moments (currently the hero byline only).

### Global Rules
- Negative tracking is **only allowed on Display and H1**
- Body text must remain **neutral tracking (0)**
- Uppercase/meta text may use **slight positive tracking**
- Line-height is **role-based**, not fixed

---

### Scale

| Role | Family | Size | Weight | Tracking | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | Geist Sans | 48px | 600 | `-0.05em` | `1.1–1.15` | Hero |
| **Byline** | VC Honey (serif) | 56px (40 mobile) | 400 | `0` | `1.15` | Hero personal-intro line above Display |
| **H1** | Geist Sans | 32px | 600 | `-0.04em` | `1.15–1.2` | Case titles |
| **H2** | Geist Sans | 24px | 500 | `0` | `1.2–1.3` | Sections |
| **Body Large** | Geist Sans | 18px | 400 | `0` | `1.5` | Context |
| **Body** | Geist Sans | 16px | 400 | `0` | `1.5–1.6` | Default |
| **Label** | Geist Sans | 14px | 500 | `0` | `1.3–1.4` | UI elements |
| **Tag/Meta** | Geist Mono | 12px | 500 | `+0.02em` | `1.3` | Uppercase metadata |
| **Code** | Geist Mono | 14px | 400 | `0` | `1.4` | Technical references |

---

### Line-Height Logic

- **Headlines:** tight (1.1–1.3) → visual density
- **Body text:** relaxed (~1.5) → readability
- **Labels/meta:** slightly tighter → alignment precision

---

## 4. Component Architecture

### Case Study Cards
- **Wrapper:** `border-t border-b border-surface-2 rounded-none` — structural 1px separators; cards inherit the canvas background
- **Hover — image hairline:** inset box-shadow on the thumbnail deepens from `rgba(0,0,0,0.06)` to `rgba(0,0,0,0.18)` over `200ms ease-out` — selection signal without card lift
- **Hover — image shadow:** soft `0 4px 12px rgba(0,0,0,0.06)` drop on the thumbnail container
- Respect `prefers-reduced-motion` — transitions wrapped in `motion-safe:` Tailwind prefix
- **Layout:**
  - Image sits on top at full `px-content-x` width
  - Text block below at `gap-10`: metadata row → headline
  - Metadata row: Geist Mono allcaps, `·`-separated — `[Case Study pill] · YEAR · ROLE · DOMAIN`
  - `Case Study` pill is inverted (filled) when present; other values are tertiary mono text

---

### Boxed Trio (Systems Grid)
- **Structure:** 3-column grid with a single outer `border border-[#eaeaea]`. Internal dividers via `border-l border-[#eaeaea]` on cells 2 & 3 only — true 1px dividers, no double borders.
- **Cell background:** `bg-[#fafafa]` (barely-off-white surface lift against the canvas)
- **Hover — border highlight:** `hover:shadow-[inset_0_0_0_1px_#000000]` inset box-shadow technique — simulates full black border on hover without affecting layout
- **Hover — top bar:** Absolutely positioned `div`, `h-[2px] bg-black`, animates `w-0 → w-full` in 300ms ease-out
- **Hover — status text:** Bottom-right `Ln: 1  Col: N` in Geist Mono 10px; `opacity-0 group-hover:opacity-30`; data-layer decoration
- **Labels:** `type-allcaps` (Geist Mono 12px, uppercase, +0.04em tracking)
- **Mobile:** Cells stack (`grid-cols-1`); swap `border-l` for `border-t` on cells 2 & 3
- **Container width:** `max-w-[840px] mx-auto` — narrower than the case study card feed for editorial contrast

### Technical Canvas Grid
- **Global Pattern:** 24px or 32px grid overlay
- **Implementation:** 1px `border-zinc-200` lines at 10–15% opacity
- **Feel:** Drafting board + paper grain

### Playground Card (dark-surface exception)
Playground cards host built-and-shipped side projects. They are the **only dark surface** on the portfolio. The exception is justified because Playground pieces inherit their product's native canvas — Reprio's interface is dark-mode-first, and showing it in a light chrome would misrepresent the product's character. Rule 6 ("do not introduce arbitrary colors") still holds: the dark surface is tokenized, semantically named (`--playground-canvas`), and scoped to this card type.
- **Tokens:** `--playground-canvas` (#0A0A0C, flat near-black — intentionally uniform, no nested surfaces), `--playground-border` (white at 9% alpha), `--playground-text` (#E4E4E7 / Zinc 200 — softened from pure white), `--playground-text-dim` (white at 72% alpha). Primary-to-secondary contrast ratio ≈ 1.24×, intentionally compressed vs the light canvas to feel more editorial and less shouty on flat black
- **Shape:** Full content-width, `rounded-[12px]` outer radius, `overflow-hidden`. Top/side padding `pt-10 px-10` (with breakpoint step-downs); **bottom padding is zero** — the screenshot bleeds flush to the card's bottom edge. Resulting aspect ≈ 2:1 on desktop — compact enough to read as a featured moment, not a narrative tile
- **Header:** Two-column desktop (title left, description right) collapsing to stacked on `max-lg`. Title uses `type-h1` (32px, weight 600, -0.04em tracking) — tight and logo-like, appropriate for a one-word product name. Description uses `type-body-m` at `--playground-text-dim`. **No inline link affordance** inside the card — the whole card is a single outbound link (`target="_blank" rel="noopener noreferrer"`), so an inline `(Live↗)` would be redundant and structurally invalid (nested anchors)
- **Screenshot framing:** The product's screenshot has the browser chrome **baked into the image asset itself**, not drawn in CSS. This keeps the card geometry clean (no nested fills, no fake chrome bars) and lets the screenshot carry its own "this is a live web app" signal. Image wrapper uses `rounded-t-[6px]` (top-only) and no visible border — the flat card canvas is the frame
- **Hover:** Same scale-only transform-transition as case-study cards, but tighter (`scale-[1.005]` instead of `1.01`) — the larger card surface amplifies motion, so the transform is scaled down accordingly
- **Scope discipline:** Playground is a **section**, not a tag. New Playground entries use `type: "playground"` in the content schema. Do not apply the dark canvas to any other card type. The single-surface flatness is load-bearing — do not introduce nested fills, gradients, or sub-panels; if a future Playground card needs structure, express it through typography and hairlines, not fills

### Cursor Label (follow-cursor affordance)
Landing-page cards carry a cursor-follow label that names the click action per card — `"View case study"`, `"View project"`, `"Open Reprio ↗"`. Layered on top of section labels, not replacing them.
- **Mechanism:** Single `CursorFollower` client component mounted in `layout.tsx` reads `data-cursor-label` from the hovered target's closest ancestor and renders a fixed-position pill following the cursor. rAF-throttled for 60fps
- **Scope:** Only landing cards carry this attribute. Detail pages and inline links do not. Keeps the affordance purposeful
- **Hardware gating:** Active only when `(hover: hover) and (pointer: fine)` matches. Touch and pen devices get nothing — the section label still communicates the schema
- **Why:** Section labels name the **schema** ("these are case studies"); cursor labels name the **action** ("clicking this opens the live app"). Two different jobs; layering is craft, not redundancy

### Citation Link (hero inline chips)
Inline word-chips in the hero lede that link to the artifact each chip names. The lede paragraph cites 4 artifacts (Service design FigJam, n8n flow, Schneider prototype, Reprio app) by replacing prose words with linked chips: "mapping `systems`, through shipping `automations`, `prototypes`, and `code`."
- **Tokens:** `--citation-link` (`#0946D7` — editorial blue, 7.4:1 contrast on white). The blue is rare on this site and reserved for chip use only
- **Utilities (`globals.css`):** `.chip-link` (base anchor: inherits color, `text-decoration: none`, `white-space: nowrap`), `.chip-color-blue` (sets color to `--citation-link`), `.link-underline` (shared with nav/footer: `::after` 1px line at `bottom: -2px`, scaleX 0→1 with origin flip, 320ms `cubic-bezier(0.65, 0, 0.35, 1)`), `.chip-arrow` (mobile-only inline ↗ via `@media (hover: none)`)
- **Reduced motion:** `.link-underline::after` transition cleared inside `prefers-reduced-motion: reduce`
- **Component:** `<CitationLink href={…} label="…" external previewSrc="…" previewCaption="…" />` renders the chip plus wires data-attributes consumed by the `<HoverPreview />` overlay
- **Scope:** Hero prose only. Not for inline body links elsewhere — those use the standard `.link-underline` utility on its own (no chip wrapper)

### Hover Preview Card (cursor-following artifact preview)
A 320×180 image card that follows the cursor when hovering a chip (or any element with `data-hover-preview-src`). Reveals what's behind the chip before commit. Desktop-only — mobile gets the inline ↗ glyph instead.
- **Chrome (case-study variant):** outer 1px `var(--surface-2)` border + 6px radius + 4px mat padding + inner image with its own 1px border + caption strip inside the same outer container. Same pattern as landing-page case-study cards
- **Sizing:** Image 280×158 (16:9). Wrapper class `.thumb-280` sets CSS vars (`--thumb-w: 280px; --thumb-h: 158px`) consumed by `.hover-preview-img`; live hero is the only consumer
- **Mounting:** `<HoverPreview />` mounted once inside the hero `<section>`. Scans the DOM for `[data-hover-preview-src]` on every mousemove; renders an always-mounted card pre-staged at `opacity: 0; transform: translateY(20px) scale(0.97)` and toggles `data-visible="true"` to animate it in
- **Entrance animation:** translateY(20px)→0 + scale(0.97)→1 + opacity 0→1, 320ms `cubic-bezier(0.16, 1, 0.3, 1)`, `transform-origin: center top`. Always-mounted + attribute-toggle pattern (NOT `@keyframes` on conditional render — the wrapper's cursor-tracking transform races element creation)
- **Reduced motion:** transform suppressed; opacity-only fade at 120ms linear
- **Hardware gating:** Active only when `(hover: hover) and (pointer: fine)` matches via `useSyncExternalStore`. Touch and pen devices get nothing — they get the inline ↗ on the chip text via `@media (hover: none)` instead
- **Why this pattern:** desktop hover capability earns a rich preview; mobile gets the platform-native one-tap-navigates with expectation-setting glyph. Hybrid is more honest than forced symmetry
- **Locked variant (NDA-gated chips):** When the source chip has `data-locked-preview-*` attributes (set by `<CitationLink disabled />`), the card layers a baseline `oklch(0% 0 0 / 0.05)` scrim across the image plus a corner pill anchored at `top: 12px; right: 12px` containing "NDA" 10px mono uppercase + 12px Lock icon at `text-primary`. Pill chrome: `oklch(99% 0 0 / 0.92)` bg, `1px solid var(--surface-2)` border, `backdrop-filter: blur(2px)` — same surface tokens as the card itself; idiom is "stamp on document" not "notification badge". Pill uses `.locked-card-badge-enter` (220ms) + `.locked-card-lock-snap` (240ms) keyframes, both `cubic-bezier(0.23, 1, 0.32, 1)`, both with reduced-motion guards. Caption stays at `text-primary` with no `↗` arrow — locked chips have no destination

### Deliverables Bar (case-study artifact tiles)
Stack of 1–N flat tiles below the Impact Bar on case studies, surfacing the concrete artifacts the case produced — live products, automation flows, FigJam boards. Skoala has 2 (`skoala.cz`, Design Sprint Figjam); TeaTime has 2 (`teatime.cz`, n8n speech-evaluation workflow). Component: `<DeliverablesBar items={…} />`.
- **Layout:** `max-w-column` text-frame width, separated tiles (`flex flex-col gap-2`) — not a joined toolbar. Each tile is a single `<a>` with label-left, `<ExternalArrow size={14}>` right
- **Tile dimensions:** `px-6 py-3` (47px total height with 15px label) on desktop; `px-4` on mobile. Optional 12px caption renders below the label
- **Rest border:** `border border-[var(--border-light)]` — Zinc 200. Same hairline weight as Case Study Cards
- **Hover — border darken:** `hover:border-[var(--border-light-hover)]` (Zinc 400) over 200ms `ease-out`. Real `border-color` transition, not an inset shadow — the tile has no image asset to carry an inset hairline, and the visible stroke swap reads as supporting confirmation rather than a "selected" state
- **Hover — arrow translate:** `<ExternalArrow>` shifts `(2px, -2px)` on group-hover via 200ms `cubic-bezier(0.16, 1, 0.3, 1)`. The arrow is the **primary** affordance carrier (transform-tier per `GUIDELINES.md` § Motion); the border darken is the **supporting** hairline
- **Focus:** `focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-inset` — independent of hover treatment. Arrow translate also fires on `:focus-visible` so keyboard users get the same affordance
- **a11y:** `aria-label="Open {label} (opens in new tab)"`; `target="_blank" rel="noopener noreferrer"`
- **Reduced motion:** Both transitions wrapped in `motion-safe:` — color shift and arrow translate suppressed; tile still functions, just without the hover affordances
- **Why border-color (not inset shadow):** existing case-study cards and Boxed Trio cells use inset-shadow hairline emphasis because they have content (images, dividers) underneath. DeliverablesBar tiles are pure text + 1 icon — an inset shadow on a flat tile reads as faint ringing artefact. A real border-color swap is cleaner on bare surfaces

### Focus States (canonical primitives)
Two utility classes own all keyboard-focus affordance in the system. Pick by surface type, not by component:
- **`.chip-link:focus-visible`** (outline-based, ~3-color stack): `outline: 2px solid var(--citation-link); outline-offset: 2px; border-radius: 2px`. Use on **inline prose elements** — chips embedded in text, citation links, anything where a `box-shadow` ring would push surrounding glyphs off baseline. Live consumer: `CitationLink.tsx`
- **`.focus-ring-card`** (double box-shadow, canvas-spaced): `box-shadow: 0 0 0 2px var(--canvas), 0 0 0 4px var(--text-primary); outline: none`. Use on **block-level interactive surfaces** — clickable cards, lightbox triggers, image buttons. The element's own `border-radius` governs the curve, so the ring follows whatever rounding the surface already has. Live consumers: `CaseStudyCard.tsx`, `PlaygroundCard.tsx`, `CaptionedImage.tsx`, `ProjectHeader.tsx` (lightbox trigger)
- **Why two primitives, not one:** outlines don't follow `border-radius` reliably across browsers and they clip on overflow:hidden surfaces — fine for inline text, broken for cards. Box-shadow rings respect radius and overflow but force a layout-shift-free spacer that's pointless on inline glyphs. Match the primitive to the surface
- **Component-specific exceptions:** `DeliverablesBar` uses `focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-inset` (inset variant) because the tile has its own border that the focus ring must sit *inside*, not float above

---

## 5. Spacing & Rhythm

Strict 8px base system. Three named tiers map to the live tokens in `src/app/globals.css`.

| Tier | Token | Desktop | Mobile (`max-md`) | Use |
|---|---|---|---|---|
| **Micro** | (Tailwind scale) | `4px` / `8px` | inherits | Inline / element gaps |
| **Component** | (Tailwind scale) | `16px` / `24px` / `32px` | inherits | Card padding, internal layout |
| **Content-x** | `--spacing-content-x` | `32px` | `20px` | Horizontal padding inside `max-w-frame` |
| **Detail** | `--spacing-detail` | `96px` | `96px` (tablet) / `72px` (mobile) | Intra-section sub-grouping (text→text, image→image inside a section) |
| **Section** | `--spacing-section` | `192px` | `160px` (tablet) / `128px` (mobile) | Section breaks — landing rows, case-study section→section |

Ladder: `32·64·96·128·192`. Three named tiers in use:
- **Subhead → first item:** `64` (heading-binds-tight pattern)
- **Intra-section:** `96` (image→image, image→text within a section)
- **Section break:** `192` (1:2 confident-double of intra-section)

**Text-vs-image gap distinction:** within a section, text→text uses `64` instead of `96` (see `feedback_text_gap_vs_image_gap` memory). Text tiers are tightly readable — the eye flows between them at close range without needing extra space. Images need the looser 96 because they're visually dense blocks.

Earlier docs cited 80/120 then 144/96 — those values were superseded.

---

## 6. Execution Rules (The "Do Nots")

1. **Do not use shadows as primary structure**  
   → Use borders; reserve shadows for subtle hover feedback only

2. **Do not apply negative tracking to body text**  
   → Only Display / H1

3. **Do not use rounded corners on layout surfaces**  
   → Only allowed for interactive elements (2–4px)

4. **Do not use gradients on text**

5. **Do not use slow animations**  
   → Motion must be fast (`duration-200`)

6. **Do not introduce arbitrary colors**  
   → The site is achromatic. Color only appears inside work screenshots.

7. **Do not use em dashes (`—`) in user-facing copy**  
   → Page titles, meta tags, headlines, MDX body, keystatic content, tooltips, alt text, aria-labels. Em dashes have become the single most reliable AI-prose tell since 2024 and this audience notices.  
   → Replacements: colon (`:`) for label/definition, period for two sentences, comma for a natural pause, or restructure with a verb so the sentence has a subject and an action instead of two nouns separated by a pause.  
   → Scope: shipped copy only. Code comments, `CLAUDE.md`, `README.md`, `docs/STATUS.md`, and `.claude/` skill files are not in scope.

---

## 7. Case Study Image Modes

Three canonical modes. Never use ad-hoc widths.

| Mode | Width | Component | Use when |
|------|-------|-----------|----------|
| **hero** | 1288px (full frame, full-bleed) | `ProjectHeader` only | The project opener. Bleeds edge-to-edge, `border-y`. One per page. |
| **content** | 1128px (default) | `CaptionedImage` no `width` | App screenshots, multi-panel composites, wide diagrams. |
| **column** | 720px | `CaptionedImage width={720}` | Personas, single device mockups, narrow diagrams. |

The `background` flag is orthogonal to width — both modes can be `true` or `false`:
- `background: true` → `bg-surface-1` + `p-8` + `border border-zinc-200`. For product UI screenshots.
  - `backgroundShade: "white"` overrides the fill to `bg-surface-tile` (#FFFFFF) for images whose own content reads as grey/dark and need explicit white framing. These are the only two allowed shades — never `surface-2`, `surface-3`, or `canvas`.
- `background: false` → transparent, no padding, no border. For self-contained Figma composites and diagrams that have their own visual frame.

**Lightbox parity:** When an image opens in the lightbox, the wrapper renders the **same `framingClass()` output** as the body — identical bg, padding, border, corner radius. There is no lightbox-only cushion knob; if a bare image needs cushion when zoomed, give it cushion in the body and both views inherit it. The lightbox backdrop itself is `bg-canvas`, so framing reads exactly as it does on the page.

### Figma Export Contract

- **No external padding.** CSS applies `p-8` (32px) when `background: true`. Baked-in padding doubles it.
- **No outer `border-radius`** on the containing frame. Inner corners on UI elements (phone bezels, browser chrome, cards) are fine.
- **No background color baked in.** The gray surface comes from CSS. Export against white or transparent.
- **Export at 2×.** Always. Content mode = 2256px wide. Column mode = 1440px wide.
- Composites (multi-panel layouts) use `background: false` — the composite is its own visual frame.

---

## Final Note

This system is intentionally **opinionated and constrained**.

It prioritizes:
- **precision over friendliness**
- **structure over decoration**
- **authorship over flexibility**

If executed correctly, it will read as:

> “engineered interface, not styled website”