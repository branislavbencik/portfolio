# CLAUDE.md — Portfolio Build

## What This Is

Personal portfolio for Branislav Benčík, Senior Product Designer. 7 pages, 5 unique templates.

## Tech Stack

- Next.js 15 with App Router (TypeScript, Tailwind CSS, Geist font — all from `create-next-app`)
- Static export (`output: 'export'` in next.config.ts)
- MDX for case study content (`@next/mdx`)
- `next/image` with `unoptimized: true` (lazy loading without Vercel image server)
- Deployed to Vercel via GitHub
- No SSR, no API routes, no database, no auth, no CMS
- No animations until Day 4 (then Framer Motion for scroll-reveal + page transitions)

## Pages

| Route | Template | Status |
|-------|----------|--------|
| `/` | Landing page | Not started |
| `/skoala` | Case study | Not started |
| `/teatime` | Case study | Not started |
| `/nnspect` | Selected project | Not started |
| `/sakurabook` | Selected project | Not started |
| `/about` | About (minimal) | Not started |
| `/resume` | PDF download link | Not started |

## Design Specs

All values from Figma, exact.

### Layout
- Frame max-width: 1288px
- Content max-width: 1128px (80px horizontal padding each side)
- Section vertical padding: 100px top and bottom
- Nav: 20px vertical, 80px horizontal padding, 64px total height
- Case study card gap: 48px
- Selected project grid: 2 columns × 558px, 12px gap
- Selected project card internal gap: 8px

### Typography (Geist Sans, Geist Mono for code)
- H1: 64px, SemiBold, line-height 100%, letter-spacing -0.04em
- H2: 40px, SemiBold, line-height 110%, letter-spacing -0.04em
- H3: 32px, SemiBold, line-height 120%, letter-spacing -0.02em
- H4: 27px, SemiBold, line-height 120%, letter-spacing -0.02em
- Subheadline: 20px, SemiBold, line-height 120%
- Body XL: 20px, Regular, line-height 150%
- Body L: 18px, Regular, line-height 150%
- Body M: 16px, Regular, line-height 150%
- Body S: 14px, Regular, line-height 150%
- AllCaps: 14px, Medium, line-height 140%, letter-spacing 0.05em
- Button: 16px, SemiBold, line-height 140%

### Colors
- Background: #ffffff
- Text: #171717
- Impact numbers bar: #0a0a0a background, #ffffff text

## Reusable Components

Build these as shared components. Case studies reuse all of them.

1. `Nav` — site nav, used on every page
2. `CaseStudyHeader` — metadata line + headline + context paragraph
3. `ImpactBar` — dark full-width band with 2-3 large numbers + labels
4. `WorkSection` — "KEY DESIGN DECISION" label + title + framing paragraph + 1-3 images with captions
5. `CaptionedImage` — image with caption below, supports variable aspect ratios
6. `NextProject` — teaser card linking to next project at page bottom
7. `SelectedProjectCard` — thumbnail + headline + metadata + tag pill (landing page grid)
8. `Footer` — contact CTA

## Content Strategy

- Case study text lives in MDX files in route folders (`src/app/skoala/page.mdx`, `src/app/teatime/page.mdx`)
- MDX imports layout components, text is editable as markdown
- Selected project content can be inline in page components (short enough)
- Images in `/public/images/{project}/` at 2x export from Figma
- Hero image pattern: `heroImage="/images/{project}/{project}-thumb.png"` — same thumbnail used on landing page cards and as the case study hero
- Never rewrite, paraphrase, or improve page copy. All text provided in the session prompt must be copied character-for-character. Do not infer, summarize, or generate alternative copy.

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

- One deliverable per session (one page, or one component system)
- 30-40 exchanges max, then /compact or new session
- Update the Status section below before ending each session
- Before committing, run `git add .` — images and binary files are easy to miss with selective staging
- If Claude gets confused: "Stop. Re-read CLAUDE.md."
- Don't research, plan, AND build in the same session

## Current Status

**Last updated:** 2026-03-21
**Current day:** Day 4
**What's done:** Landing page; design token system; all shared components; Skoala case study page; TeaTime case study page; NNspect overlay (Radix Dialog, 3 images); Sakurabook overlay content; Footer component (clipboard tooltip, Framer Motion); optional image captions; Nav/Footer Resumé → /resume.pdf
**What's next:** /about page
**Blockers:** None
