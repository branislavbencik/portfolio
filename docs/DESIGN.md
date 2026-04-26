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
  - Primary: `border-zinc-300` (1px)  
  - Secondary: `border-zinc-200` (1px)

- **Radii Rule:**
  - Layout surfaces: `rounded-none` (0px)
  - Interactive elements only: `rounded-[2px–4px]`

---

## 3. Typography Scale

Built on **Geist Sans** and **Geist Mono**.

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

### Citation Link (hero superscript references)
Inline numbered references in the hero prose, styled as Wikipedia-style superscripts. The hero's generalist paragraph cites 5 supporting artifacts (Blueprint PDF, n8n, Schneider Figma, Sideproject, Skoala Figma) by superscript number.
- **Tokens:** `--citation-link` (`#0946D7` — editorial blue, 7.4:1 contrast on white) and `--citation-link-hover` (`#07349F` — darker on hover/focus). The blue is rare on this site and reserved for citation use only
- **Utilities (`globals.css`):** `.citation-sup` (positioned superscript: `top: -0.75em`, `font-size: 12px`, `line-height: 0` — fixed px so it doesn't shrink with parent lede at mobile breakpoints; keeps line height stable), `.citation` (the anchor: blue, no underline), `.citation-arrow` (the trailing `↗`: `translate(2px, -2px)` on hover, `160ms ease-out`)
- **Reduced motion:** `.citation-arrow` transition cleared inside `prefers-reduced-motion: reduce`
- **Component:** `<CitationLink href={…} label="…" number={1} />` renders the full pattern
- **Scope:** Hero prose only. Not for inline body links elsewhere — those use the standard `.link-underline` utility

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
- `background: false` → transparent, no padding, no border. For self-contained Figma composites and diagrams that have their own visual frame.

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