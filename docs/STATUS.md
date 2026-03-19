# Portfolio Build Status

**Day:** 2 of 5 (Thu Mar 19) · **Deploy:** portfolio-lac-pi-40.vercel.app · **Sprint end:** Sun Mar 23

## Pages
`/` → Done (landing) · `/skoala` → Done · `/teatime` → Stub · `/nnspect` → Stub · `/sakurabook` → Stub · `/about` → Stub · `/resume` → Not started

## What's Next
Day 3: TeaTime case study page (`/teatime`)

## Session Log
1. Scaffold — static export, MDX, Figma tokens, route stubs (`bd15291`)
2. Landing page — Nav, case study cards, selected project grid (`990a8aa`)
3. Thumbnails — added project images, pushed to git to fix Vercel display (`583a3f2`, `6a9c53c`)
4. Skoala case study — MetadataRow, CaseStudyHeader, ContributionList, ImpactBar, WorkSection, CaptionedImage components + full /skoala MDX page; CaseStudyCard extracted to shared component
5. Skoala polish — WorkSection refactored to Tailwind, description prop, 552px text column fixed (added --max-width-* to globals.css), 100px image spacing, centered captions, double border at page end (two 1px lines, 8px gap)
6. CaseStudyCard fixes — correct image aspect ratio (744×432), TagPill shared component, space-between layout pins buttons to bottom of left column

## Known Issues
(none)

## Decisions
- Tailwind v4: tokens in `globals.css @theme`, not `tailwind.config.ts`
- Next.js 15 App Router, static export
- MDX pages live in route folders (`/skoala/page.mdx`), not `src/content/`
- `next/image` with `fill` + `aspect-ratio` works fine for static export — images just need to be committed
