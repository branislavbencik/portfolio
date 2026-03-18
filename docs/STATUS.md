# Portfolio Build Status

## Current State
- **Day:** 1 (Wednesday March 18)
- **Sprint end:** Sunday March 23
- **Last session:** Session 1 — scaffold

## What's Done
- [x] Project scaffolded with create-next-app
- [x] next.config.ts — static export, unoptimized images, MDX plugin
- [x] @next/mdx + @mdx-js/loader + @mdx-js/react installed
- [x] src/mdx-components.tsx created (App Router MDX requirement)
- [x] globals.css — Figma design tokens in @theme (colors, spacing, typography)
- [x] Route folders: /skoala, /teatime, /nnspect, /sakurabook, /about (placeholder pages)
- [x] Directories: src/content, src/components, public/images/{skoala,teatime,nnspect,sakurabook}
- [x] src/app/page.tsx stripped to bare "Portfolio" heading
- [x] npm run build passes (static export)

## What's Next
- Git push → Vercel deploy empty shell
- Build landing page (Day 1)

## Decisions Made
- Tailwind v4 (create-next-app default) — tokens live in globals.css @theme, not tailwind.config.ts
- Next.js 16.1.7 (latest at scaffold time), App Router

## Known Issues
(none)
