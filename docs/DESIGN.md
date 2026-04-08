# Design System (`DESIGN.md`)

## 1. Core Philosophy
This portfolio operates like a developer tool, not a marketing page. It uses darkness as the native medium, where information density is managed through subtle gradations of white opacity rather than color variation. It merges Vercel's extreme structural minimalism with Linear's dark-mode luminance stacking. 

- **Achromatic:** Zero decorative color. The work (images, case studies) provides the only color. 
- **Engineered Typography:** Geist Sans with aggressive negative tracking makes headlines look like minified code. Geist Mono is used strictly for metadata, tags, and technical labels.
- **Shadow-as-Border:** We do not use traditional CSS borders. All borders are rendered via `box-shadow` to create whisper-thin, anti-aliased containment without disrupting the box model.
- **Textured Canvas:** The deepest layer of the site accommodates subtle, AI-generated (Midjourney) dark noise/mesh textures. UI elements float above this using luminance stepping.

## 2. Color Tokens (Tailwind Config Base)

We use a strictly monochrome scale based on white opacity over a near-black canvas.

### Backgrounds (Luminance Stacking)
- **Canvas Base (`bg-canvas`):** `#08090A` — The deepest black. Holds the Midjourney textures.
- **Surface Level 1 (`bg-surface-1`):** `rgba(255, 255, 255, 0.02)` — Subtle cards, default states.
- **Surface Level 2 (`bg-surface-2`):** `rgba(255, 255, 255, 0.04)` — Hover states, elevated cards.
- **Surface Level 3 (`bg-surface-3`):** `rgba(255, 255, 255, 0.08)` — Active states, primary buttons.

### Typography
- **Primary Text (`text-primary`):** `#EDEDED` (or `rgba(255, 255, 255, 0.92)`) — Never pure white, prevents eye strain.
- **Secondary Text (`text-secondary`):** `#A1A1AA` (Zinc 400) — Body copy, contextual framing.
- **Tertiary Text (`text-tertiary`):** `#71717A` (Zinc 500) — Metadata, tags, subtle captions.

### Structure, Borders & Radii
We do NOT use shadow-borders or elevation. This is a structural wireframe aesthetic.
- **Borders:** Use strict, hard 1px CSS borders (`border border-zinc-200`). Hard lines define the grid and separate content.
- **Radii Rule:** Brutally sharp. `rounded-none` (0px) everywhere. No exceptions. Cards, images, and tags are boxes.

### Tags & Metadata
- **Tags:** Structural and monochromatic. `border border-zinc-200 text-zinc-500 font-mono text-[12px] uppercase px-2 py-0.5 rounded-none`. Zero colored backgrounds.
- **Layout:** Metadata and tags are part of the structural grid. They remain visible at all times to balance the card's typographic weight.

## 3. Typography Scale

Built entirely on **Geist Sans** and **Geist Mono**. 
*Rule: Only three weights exist in this system. 400 (read), 500 (interact), 600 (announce).*

| Role | Family | Size | Weight | Tracking (Letter Spacing) | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | Geist Sans | 48px | 600 | `-0.05em` | Hero section |
| **H1** | Geist Sans | 32px | 600 | `-0.04em` | Case study titles |
| **H2** | Geist Sans | 24px | 500 | `-0.03em` | Section headers ("More Work") |
| **Body Large** | Geist Sans | 18px | 400 | `normal` | Case study context paragraphs |
| **Body** | Geist Sans | 16px | 400 | `normal` | Default reading text |
| **Label** | Geist Sans | 14px | 500 | `normal` | Buttons, navigation |
| **Tag/Meta** | Geist Mono | 12px | 500 | `normal` | `uppercase`, Domain tags, dates |
| **Code** | Geist Mono | 14px | 400 | `normal` | Inline code, technical references |

## 4. Component Architecture

### Case Study Cards (The Heavy Hitters)
- **Layout:** 100% width of the container. Zero internal padding around the image.
- **Image Treatment:** Top-rounded `rounded-t-xl` (12px), bordered using `shadow-border`.
- **Content Block:** Below the image. Minimalist. 
- **Typography:** H1 (32px) for the project name.
- **Tags:** Geist Mono 12px, `text-tertiary`, separated by `·` or grouped in subtle pills (`bg-surface-1`, `shadow-border-subtle`, `rounded-full`, px-2).
- **Hover Interaction:** Entire card shifts up 2px. Image scales to `1.02` inside an `overflow-hidden` wrapper. `duration-300 ease-out`.

### "More Work" Grid (The Archives)
- **Layout:** Dense 3 or 4-column CSS grid.
- **Thumbnail:** 3:2 aspect ratio. High contrast crops. `rounded-lg` (8px). `shadow-border-subtle`.
- **Text:** Placed underneath the thumbnail.
- **Typography:** 14px Geist Sans Medium (Project Name) block-stacked over 12px Geist Mono (Domain/Year).
- **Hover Interaction:** Thumbnail `shadow-border` shifts from subtle (0.04) to standard (0.08).

### Buttons & Interactive Elements
- **Ghost Button (Default):** `bg-surface-1`, `text-primary`, `shadow-border`, `rounded-md` (6px). Hover: `bg-surface-2`.
- **Focus States:** Every interactive element must have a stark focus ring for accessibility: `outline-none ring-2 ring-zinc-500 ring-offset-2 ring-offset-[#08090A]`. 

## 5. Spacing & Grid System
Strict adherence to Vercel's 8px base rhythm.
- **Micro:** `4px`, `8px` (inside buttons, between tags and titles)
- **Component:** `16px`, `24px`, `32px` (inside cards, standard margins)
- **Section/Gallery:** `80px`, `120px` (massive whitespace between the Hero, Case Studies, and More Work sections to create pacing).

## 6. Execution Rules (The "Do Nots")
1. **Do not use CSS `border` properties.** Use `box-shadow` for all containment lines.
2. **Do not use positive tracking on Geist Sans.** It must be tightly compressed at large sizes to look engineered. 
3. **Do not use gradients on text.**
4. **Do not add description paragraphs to the landing page cards.** If the image and the headline don't sell the click, the image is wrong.
5. **Do not fade elements in slowly.** All motion should be fast, high-damping, and mechanical (`duration-200` to `duration-300` max).