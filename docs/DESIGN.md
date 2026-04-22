# Design System (`DESIGN.md`)

> **Scope.** Visual execution only — tokens, components, image modes, spacing, motion. Strategic claims (what the portfolio says, hero copy, proof stack, body-prose caps) live in `positioning.md`. When claims/copy conflict with this file, `positioning.md` wins. See `CLAUDE.md` → *Source-of-Truth Hierarchy*.

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

The canvas is achromatic. Case study cards do NOT use project-specific color (no aura glows, no halos, no identity tints). Color only appears inside work screenshots.

### Typography
- **Primary Text (`text-primary`):** `#18181B` (Zinc 900)
- **Secondary Text (`text-secondary`):** `#52525B` (Zinc 600)
- **Metadata/Tags (`text-tertiary`):** `#71717A` (Zinc 500)

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
| **Display** | Geist Sans | 48px | 600 | `-0.05em` | `1.1–1.15` | Case-study hero (detail page) |
| **Hero Prose** | Geist Sans | 30px | 400 | `-0.015em` | `1.3` | Landing hero paragraph (generalist claim) |
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

### Case Study Cards (v3.2 — minimal rest, image-only scale + reveal hover)

- **Wrapper: NONE.** Bare thumbnail + text below. No `border`, no background fill, no outer padding box. The thumbnail is itself a bounded rectangle; the text beneath doesn't need an additional frame.
- **Rest state:** thumbnail (**3:2** via `aspect-[3/2]` + `object-cover`, full card width) → 16px gap → single-line headline `**Company** — Tagline`. **Nothing else visible.** No meta row at rest (Case Study pill, year, role all live in the hover reveal or on the detail page). No description line. No tags.
- **Headline composition:** `<strong class="text-text-primary font-semibold">{company}</strong><span class="text-text-secondary font-normal"> — {tagline}</span>`. Uses the `type-card-title` utility: **16px**, weight 400 base, line-height 1.4, letter-spacing -0.005em. Company overrides to 600 + primary color; tagline stays 400 + secondary color. Two-level hierarchy in one line, no second font size.
- **Hover — reveal panel:**
  - Panel slides up from thumbnail's bottom edge. Height is content-driven (~40px = `py-2.5` + mono allcaps line-height).
  - Content: up to 3 tags as `type-allcaps` (Geist Mono 12px, `·`-separated, **bare text only — no pill border, no chip padding**). First tag can carry `highlight: true` which renders a `★` prefix (U+2605, inherits text color — monochrome, on-palette).
  - Background: `--canvas` (continuous with page); no border-top — panel relies on canvas-background contrast against the photo underneath for separation.
  - `pointer-events: none` so hover doesn't flicker on panel edge.
  - Motion: `transform: translateY(100% → 0)` over **200ms** with `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Hover — image lift:** `transform: scale(1.02)` on the `<Image>` only (NOT the whole card) over **300ms** with `cubic-bezier(0.25, 1, 0.5, 1)`. Image scales beneath the overflow-hidden thumbnail container; photo appears to push forward toward the viewer. Card layout (thumbnail container + headline block) stays pixel-stable, so no sibling-gap bleed.
- **No brightness, no shadow, no whole-card scale.** Two properties, one story: image pushes toward viewer, panel rises from bottom. Whole-card scale was tested (v3.1) and rejected — it bled into the 24px grid gap and created visual overflow. Brightness was tested and rejected — washed-out on off-white canvas. Shadow was considered but incongruous with the "load-bearing borders" system (see §6 Do-Nots).
- **Tag schema:** `tags: { text: string; highlight?: boolean }[]` in YAML/Keystatic. `highlight: true` renders `★ ` before the tag text (accessibility: `aria-hidden` on the star glyph).
- **Keyboard parity:** `:focus-within` on the card link triggers the identical reveal + image scale. Tab shows tags the same as hover.
- **Reduced motion:** wrap transitions in `motion-safe:` Tailwind prefix. `prefers-reduced-motion: reduce` → panel renders static (tags always visible), no scale transform.
- **Dropped variants (explored, rejected across v3.0 → v3.2):** B1 brightness (washed-out on off-white), B3 desaturate (breaks on already-muted thumbs), 4px title shift (below perceptual threshold), tag cascade (~520ms total — outlives the grid scan), hover shadow (incongruous with hard-1px-border structural system), whole-card scale (layout bleed into grid gap), reveal-panel `border-t` (floating-seam artifact in motion).
- **Component reuse:** `CaseStudyCard` is the single source of truth — rendered by both the landing grid (`src/app/page.tsx`) and the detail-page "More work" row (`src/components/NextProjectSection.tsx`). Register parity guaranteed by shared code.

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

---

## 5. Spacing & Rhythm

Strict 8px base system.

- **Micro:** `4px`, `8px`
- **Component:** `16px`, `24px`, `32px`
- **Section:** `80px`, `120px`

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

7. **Em dashes (`—`) — purpose-driven only** (softened from v2's blanket ban, 2026-04-22)
   → **Permitted** when structurally load-bearing:
     - Apposition: "Branislav — a generalist product designer"
     - Register shift: "code — and down the rabbit hole to…"
     - Parenthetical aside that a comma can't cleanly handle
   → **Banned** when substituting for a comma or period to create AI-prose cadence (e.g. "ship features — quickly").
   → **Reviewer test:** can you replace the dash with a comma or period without losing meaning? If yes, use that instead.
   → Scope: shipped copy only. Code comments, `CLAUDE.md`, `README.md`, `docs/STATUS.md`, and `.claude/` skill files are not in scope.

---

## 7. Case Study Image Modes

Three canonical modes, driven by tokens in `src/app/globals.css`. Never use ad-hoc widths.

| Mode | Width | Token | Component | Use when |
|------|-------|-------|-----------|----------|
| **hero** | 1080px (full frame) | `--max-width-frame` | `ProjectHeader` only | The project opener. One per page. |
| **figure** | 800px (default) | `--max-width-figure` | `CaptionedImage` no `width` | App screenshots, multi-panel composites, wide diagrams. |
| **column** | 560px | `--max-width-column` | `CaptionedImage width={560}` or text columns | Personas, single device mockups, narrow diagrams, body text columns. |

The `background` flag is orthogonal to width — both modes can be `true` or `false`:
- `background: true` → `bg-surface-1` + `p-8` + `border border-zinc-200`. For product UI screenshots.
- `background: false` → transparent, no padding, no border. For self-contained Figma composites and diagrams that have their own visual frame.

### Figma Export Contract

- **No external padding.** CSS applies `p-8` (32px) when `background: true`. Baked-in padding doubles it.
- **No outer `border-radius`** on the containing frame. Inner corners on UI elements (phone bezels, browser chrome, cards) are fine.
- **No background color baked in.** The gray surface comes from CSS. Export against white or transparent.
- **Export at 2×.** Always. Hero = 2160px wide. Figure = 1600px wide. Column = 1120px wide.
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