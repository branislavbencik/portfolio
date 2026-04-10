# CLAUDE.md — Portfolio Build

## What This Is

Personal portfolio for Branislav Benčík, Senior Product Designer.

## Tech Stack

- Next.js 15 with App Router (TypeScript, Tailwind CSS, Geist font — all from `create-next-app`)
- Static export (`output: 'export'` in next.config.ts)
- MDX for case study content (`@next/mdx`)
- `next/image` with `unoptimized: true` (lazy loading without Vercel image server)
- Deployed to Vercel via GitHub
- No SSR, no API routes, no database, no auth, no CMS

## Pages

| Route | Template |
|-------|----------|
| `/` | Landing page |
| `/skoala` | Case study (MDX) |
| `/teatime` | Case study (MDX) |
| `/nnspect` | Selected project (dialog) |
| `/sakurabook` | Selected project (dialog) |
| `/resume.pdf` | PDF download (static file) |

## Design Tokens — Single Source of Truth

**`src/app/globals.css` is the single source of truth for ALL design values.**
Do NOT hardcode pixel values, colors, or font sizes anywhere. Always use:
- CSS custom properties (e.g., `var(--spacing-content-x)`)
- Tailwind theme utilities (e.g., `max-w-content`, `px-content-x`, `py-section`)
- Typography utility classes (e.g., `type-h1`, `type-body-m`, `type-allcaps`)

### What's defined in globals.css:
- **Layout:** `--width-frame` (1288px), `--width-content` (1128px), `--width-text` (552px), `--spacing-section`, `--spacing-content-x`, `--spacing-nav-x`/`--spacing-nav-y`
- **Typography:** `type-h1` through `type-body-s`, `type-allcaps`, `type-button` — all as `@layer utilities` classes with font-size, weight, line-height, and letter-spacing baked in
- **Colors:** Primitive palette (`--black` through `--white`, `--green-500`) and semantic tokens (`--foreground`, `--foreground-secondary`, `--foreground-tertiary`, `--background`, `--background-alt`, `--border-strong`, `--border-light`, `--accent-live`)
- **Gaps:** `--gap-case-study`, `--gap-selected-project`, `--gap-selected-card`
- **Responsive scaling:** Typography utilities and layout spacing variables auto-scale at breakpoints via media queries in globals.css — see Responsive Strategy below

### Rules:
- Always use `type-*` utility classes for text. Never set `font-size` directly.
- Always use semantic color tokens (`--foreground`, not `#171717`; `--background`, not `#ffffff`).
- Always use layout variables (`px-content-x`, not `px-[80px]`).
- If you need a value that doesn't exist in globals.css, ask before inventing a new token.

## Responsive Strategy

### Approach: Desktop-first with max-width overrides

Base (unprefixed) styles = desktop layout. This is already built.
Responsive changes go downward using Tailwind's built-in `max-*` variants.

### Breakpoints (three levels)

| Variant | Media query | Covers |
|---------|-------------|--------|
| `max-lg:` | `≤1023px` | Tablet portrait |
| `max-md:` | `≤767px` | Mobile |

### Critical rules for Claude Code:

1. **NEVER use min-width prefixes** (`md:`, `lg:``) for responsive changes. Always use `max-lg:`, `max-md:`.
2. **Do NOT add responsive font-size classes.** Typography auto-scales via media queries in globals.css. Just use `type-h1` and it works at every breakpoint.
3. **Do NOT add responsive padding to layout wrappers.** The CSS variables `--spacing-content-x`, `--spacing-section`, `--spacing-nav-x` auto-scale at breakpoints. Components using `px-content-x` and `py-section` adapt automatically.
4. **Do NOT mix min-width and max-width approaches.** Every responsive override must use `max-lg:`, or `max-md:`. No exceptions.
5. **Base styles are desktop styles.** Never wrap desktop styles in a breakpoint prefix.


## Content Strategy

- Case study text lives in MDX files in route folders (`src/app/skoala/page.mdx`, `src/app/teatime/page.mdx`)
- MDX imports layout components, text is editable as markdown
- Selected project content can be inline in page components (short enough)
- Images in `/public/images/{project}/` at 2x export from Figma
- Hero image pattern: `heroImage="/images/{project}/{project}-thumb.png"` — same thumbnail used on landing page cards and as the case study hero
- Never rewrite, paraphrase, or improve page copy. All text provided in the session prompt must be copied character-for-character. Do not infer, summarize, or generate alternative copy.

## Code Quality Rules

These rules apply to EVERY edit. No exceptions.

1. **Always use existing CSS variables, design tokens, and Tailwind utility classes instead of hardcoded values or inline styles.** Never introduce new tokens without explicit approval. (Claude has repeatedly used hardcoded colors, inline fontSize styles, or created unnecessary new tokens instead of using the established design system.)

2. **Always read existing files before modifying or creating new ones.** Never overwrite or create a file without first checking what already exists. (Claude has missed existing props, mangled files during edits, and tried to create files without reading them first.)

3. **For this Next.js project:** Use explicit width/height on `next/image` (not fill prop) for static export compatibility. Use Tailwind `@layer utilities` for custom classes, not raw JIT notation. (Two sessions hit the same gotchas — fill prop breaking static export, and JIT not generating custom utility classes.)

4. **When asked to 'update skills' or 'update status', always update STATUS.md** (not SKILLS.md or other files) unless explicitly told otherwise.

5. **No inline styles.** All styling through Tailwind classes or CSS utility classes defined in globals.css.

6. **No new dependencies without explaining why first.**

7. **THE DESIGN BIBLE:** `DESIGN.md` is the absolute source of truth for aesthetics. BEFORE editing any UI component, you MUST read `DESIGN.md`. If you find a discrepancy between `CLAUDE.md`, `globals.css`, and `DESIGN.md`, `DESIGN.md` wins. If you invent a new UI pattern that works, you MUST update `DESIGN.md` to document it.

## Figma Console MCP

Desktop Bridge is available. Pair before each session (`figma_pair_plugin`). Key commands:
- `figma_capture_screenshot` — grab any frame as visual reference
- `figma_execute` — walk text nodes, extract copy (keep depth ≤ 6)

Key node IDs:
- Landing Page: 166:20106 (1288 × 3084)
- Skoala: 166:19989 (1288 × 6607)
- TeaTime: 181:37720 (1288 × 9758)
- NNspect: 297:51453 (1288 × 2731)
- Sakurabook: 305:67941 (1288 × 2703)

Bridge gotchas: Pairing expires in 5 min. REST API is burned (free plan). Complex node walks timeout at ~7s. If calls timeout, re-pair.

## Session Rules

- **Start every session by creating a new branch off `main`** (e.g. `hero-polish`, `crowdberry-content`, `critique-fixes`). Never commit directly to `main`. First action of the session: `git checkout main && git pull && git checkout -b <branch-name>`.
- One deliverable per session (one page, or one component system)
- 30-40 exchanges max, then /compact or new session
- End each session with `/project:ship` — it builds, commits, pushes, updates `docs/STATUS.md`, and opens a pull request against `main`
- If Claude gets confused: "Stop. Re-read CLAUDE.md."
- Don't research, plan, AND build in the same session
- Current project status lives in `docs/STATUS.md` — not here