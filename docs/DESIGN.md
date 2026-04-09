# Design System (`DESIGN.md`)

## 1. Core Philosophy
This portfolio operates like a high-end architectural CAD tool or a technical blueprint. It uses a **Light Technical Canvas** as the native medium, where information density is managed through structural grid lines and a tactile, paper-like texture.

- **Achromatic Canvas:** 98% of the site is monochrome. Color is strictly reserved for project-specific "Aura Glows" and the actual work screenshots.
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

### Case Study "Aura" Cards
- **Wrapper:** `border border-black/8 rounded-none bg-white` — soft 8% black border defines card edges without harsh contrast
- **Default shadow:** `0 2px 12px rgba(0,0,0,0.04)` — diffuse, barely perceptible depth
- **Hover shadow:** `0 12px 32px rgba(0,0,0,0.1)` + `translateY(-4px)` — snappy 150ms ease-out lift
- **Hover bg:** shifts to `#F9F9F9` (off-white)
- **Aura Glow:**  
  - Absolutely positioned behind image  
  - Project-specific `rgba` color (10–15% opacity)  
  - `blur-[80px]` — 36s multi-axis drift (translate + scale + rotate)
- **Layout:**  
  - Image area: `pt-16 px-16 pb-0` — no bottom padding; metadata sits flush below at 16px gap
  - Metadata: `px-16 pt-4 pb-6` — left edge aligned with image edge
  - Vertical stack: tag → headline → description → metric
  - All tags/metrics: Geist Mono
- **No inner dividing border** between image and metadata

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

1. **Do not use shadows**  
   → Use borders or Aura Glows

2. **Do not apply negative tracking to body text**  
   → Only Display / H1

3. **Do not use rounded corners on layout surfaces**  
   → Only allowed for interactive elements (2–4px)

4. **Do not use gradients on text**

5. **Do not use slow animations**  
   → Motion must be fast (`duration-200`)

6. **Do not introduce arbitrary colors**  
   → Only Aura Glows define color presence

---

## Final Note

This system is intentionally **opinionated and constrained**.

It prioritizes:
- **precision over friendliness**
- **structure over decoration**
- **authorship over flexibility**

If executed correctly, it will read as:

> “engineered interface, not styled website”