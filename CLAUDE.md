# CLAUDE.md — Portfolio Build

Personal portfolio for Branislav Benčík, Senior Product Designer. See `.impeccable.md` for brand context (audience, voice, design principles).

## Documentation Map

Four docs, one job each. Read whichever matches the question.

| File | Owns | When to read |
|------|------|--------------|
| `CLAUDE.md` (this file) | Code conventions, session workflow, pointers to the others | Every session start |
| `.impeccable.md` | Brand: who it's for, voice, design principles, anti-references | Before *any* design or copy work |
| `docs/DESIGN.md` | Visual system: tokens, type scale, color, layout, components | Before editing any UI component |
| `GUIDELINES.md` | Behavior: interactions, motion, a11y, performance, microcopy | Before adding interactions, animations, or microcopy |

If two docs disagree, escalate: `.impeccable.md` for brand, `docs/DESIGN.md` for visuals, `GUIDELINES.md` for behavior. Don't silently resolve — flag in chat.

## Tech Stack

- **Next.js 16** with App Router + Turbopack
- **React 19**, **TypeScript**, **Tailwind CSS 4** (tokens in `globals.css @theme`, not `tailwind.config.ts`)
- **Keystatic** as a git-backed CMS — content lives in `src/content/projects/*.yaml`, edited locally via `/keystatic`
- **Geist** (Sans + Mono) loaded via the `geist` package
- **Motion** for animation, **Playwright** for responsive E2E
- Static-friendly architecture: pre-rendered at build via `generateStaticParams`, `next/image` with `unoptimized: true`
- No SSR runtime, no API routes, no database, no auth
- Deployed to Vercel on every merge to `main`

## Pages

All project pages render from a single `src/app/[slug]/page.tsx` template against Keystatic content.

| Route | Source | Type |
|-------|--------|------|
| `/` | `src/app/page.tsx` | Landing page (hero + sectioned cards) |
| `/skoala`, `/teatime` | `[slug]/page.tsx` | Case studies (long-form) |
| `/schneider`, `/nnspect`, `/sakurabook`, `/crowdberry` | `[slug]/page.tsx` | Selected projects |
| `/reprio` | `[slug]/page.tsx` | Playground (built side-projects, dark surface) |
| `/about`, `/resume` | TBD | Stub / not started |
| `/resume.pdf` | `public/resume.pdf` | Static download |
| `/keystatic` | `src/app/keystatic/` | Local content editor (dev only) |

## Design tokens

`src/app/globals.css` is the single source of truth for all design values. **See `docs/DESIGN.md` for the full system.**

The rule for code: always use tokens, never hardcode pixel values, colors, or font sizes. Use:
- CSS custom properties (e.g., `var(--spacing-content-x)`)
- Tailwind theme utilities (`max-w-frame`, `px-content-x`, `py-section`)
- Typography utility classes (`type-h1`, `type-body-m`, `type-allcaps`)

The `audit:tokens` script (`bash scripts/audit-tokens.sh`) fails if hardcoded values appear in `src/`. It does not audit `globals.css` — that's the source of truth.

## Responsive Strategy

Desktop-first with `max-lg:` (≤1023px) and `max-md:` (≤767px) only. Base styles = desktop. **Never use min-width prefixes** (`md:`, `lg:`, `xl:`).

Typography auto-scales via `:root` media queries in `globals.css`. Spacing tokens (`--spacing-section`, `--spacing-content-x`, `--spacing-detail`) auto-scale at breakpoints. Components using `px-content-x` / `py-section` adapt automatically — don't add per-element responsive padding.

## Code Quality Rules

These apply to every edit. No exceptions.

1. **Use existing tokens, design utilities, and Tailwind classes — never hardcode values or use inline styles.** No new tokens without explicit approval.
2. **Read existing files before editing or creating new ones.** Never overwrite blind.
3. **For `next/image`:** use explicit `width`/`height` (not `fill`) for static-export compatibility. Use Tailwind `@layer utilities` for custom classes, not raw JIT notation.
4. **No inline styles.** All styling through Tailwind classes or `@layer utilities` in `globals.css`.
5. **No new dependencies without explaining why first.**
6. **When asked to "update status," update `docs/STATUS.md`** — not SKILLS.md or anywhere else.
7. **Never rewrite, paraphrase, or improve case-study or page copy.** Microcopy (alt text, button labels, errors, 404, tooltips) is in scope; case-study text and MDX bodies are not. See `GUIDELINES.md` § Content for full scope.

## Figma Console MCP

Desktop Bridge available. Pair before each session (`figma_pair_plugin`). Useful commands:
- `figma_capture_screenshot` — grab any frame as visual reference
- `figma_execute` — walk text nodes, extract copy (keep depth ≤ 6)

Key node IDs: Landing 166:20106 · Skoala 166:19989 · TeaTime 181:37720 · NNspect 297:51453 · Sakurabook 305:67941

Bridge gotchas: pairing expires in 5 min. REST API is burned (free plan). Complex node walks timeout at ~7s. If calls timeout, re-pair.

## Session Rules

- **Branch off `main` for every session.** First action: `git checkout main && git pull && git checkout -b <branch-name>` — or use the `cc <branch>` shell function which handles worktree creation.
- One deliverable per session (one page, or one component system).
- 30–40 exchanges max, then `/compact` or new session.
- End with `/project:ship` — it builds, commits, pushes, syncs the four docs interactively, updates `docs/STATUS.md`, and opens a PR against `main`.
- If Claude gets confused: "Stop. Re-read CLAUDE.md."
- Don't research, plan, AND build in the same session.
- Current project status lives in `docs/STATUS.md` — not here.
- **Always surface the current dev-server URL.** When a Next dev server is running for the active worktree (typically on `:3000`–`:3009` depending on which ports are already taken), include the exact `http://localhost:<port>` at the top of every reply, and re-state it after restarts. The terminal/tmux status line shows the parent session's port and is misleading when multiple worktrees run in parallel — never trust it as a substitute.
