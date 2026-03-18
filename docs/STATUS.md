# Portfolio Build Status

**Day:** 1 of 5 (Wed Mar 18) · **Deploy:** portfolio-lac-pi-40.vercel.app · **Sprint end:** Sun Mar 23

## Pages
`/` → Done (landing) · `/skoala` → Stub · `/teatime` → Stub · `/nnspect` → Stub · `/sakurabook` → Stub · `/about` → Stub · `/resume` → Not started

## What's Next
Day 2: Skoala case study page (`/skoala`)

## Session Log
1. Scaffold — static export, MDX, Figma tokens, route stubs (`bd15291`)
2. Landing page — Nav, case study cards, selected project grid (`990a8aa`)
3. Thumbnails — added project images, pushed to git to fix Vercel display (`583a3f2`, `6a9c53c`)

## Known Issues
(none)

## Decisions
- Tailwind v4: tokens in `globals.css @theme`, not `tailwind.config.ts`
- Next.js 15 App Router, static export
- MDX pages live in route folders (`/skoala/page.mdx`), not `src/content/`
- `next/image` with `fill` + `aspect-ratio` works fine for static export — images just need to be committed
