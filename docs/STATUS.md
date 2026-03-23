# Portfolio Build Status

**Day:** 5 of 5 (Mon Mar 23) · **Deploy:** portfolio-lac-pi-40.vercel.app · **Sprint end:** Sun Mar 23

## Pages
`/` → Done (landing) · `/skoala` → Done · `/teatime` → Done · `/nnspect` → Done (dedicated page) · `/sakurabook` → Done (dedicated page, workspace images pending) · `/about` → Stub · `/resume` → Not started

## What's Next
Responsive implementation (landing page, case study, selected project pages)

## Session Log
1. Scaffold — static export, MDX, Figma tokens, route stubs (`bd15291`)
2. Landing page — Nav, case study cards, selected project grid (`990a8aa`)
3. Thumbnails — added project images, pushed to git to fix Vercel display (`583a3f2`, `6a9c53c`)
4. Skoala case study — MetadataRow, CaseStudyHeader, ContributionList, ImpactBar, WorkSection, CaptionedImage components + full /skoala MDX page; CaseStudyCard extracted to shared component
5. Skoala polish — WorkSection refactored to Tailwind, description prop, 552px text column fixed (added --max-width-* to globals.css), 100px image spacing, centered captions, double border at page end (two 1px lines, 8px gap)
6. CaseStudyCard fixes — correct image aspect ratio (744×432), TagPill shared component, space-between layout pins buttons to bottom of left column
7. Design token cleanup — added type-subheadline, type-body-*, type-allcaps, type-button utilities; baked font-weight into type-h*; gap-* utilities; accent-live color token; removed all hardcoded px values and inline gap styles from all 10 components; deleted docs/figma-tokens.ts
8. TeaTime case study — full /teatime MDX page: CaseStudyHeader, ContributionList, ImpactBar, 3 WorkSections (ACQUIRE/DIFFERENTIATE/AUTOMATE), 8 CaptionedImages with custom width/border/bg/rounded props, NextProject linking to /skoala
9. Selected project overlays — Radix Dialog overlay system; ProjectOverlay + SelectedProjectContent components; NNspect overlay with 3 images wired up; stub pages deleted; Sakurabook card visible, overlay TODO; overlay refined: 1224px wide centered panel, full height, no radius, 48px padding, fade+scale animation, #000/40% backdrop
10. Dedicated project pages — converted overlay system to /nnspect and /sakurabook dedicated pages; removed ProjectOverlay.tsx and @radix-ui/react-dialog; landing page cards link via href prop; Sakurabook content added (workspace images pending)
11. Selected project header — 552px centered text block (metadata, headline, description, tag) matching case study hero column width
12. Token audit tooling + inline style fixes — audit-tokens.sh script; fixed all 6 inline style violations (gap-case-study, max-w-text, pl-[em], basis-[35%], CaptionedImage dynamic width); e2e responsive spec improved with overflowMustPass flag and image-load await

## Known Issues
(none)

## Decisions
- Tailwind v4: tokens in `globals.css @theme`, not `tailwind.config.ts`
- Next.js 15 App Router, static export
- MDX pages live in route folders (`/skoala/page.mdx`), not `src/content/`
- `next/image` with `fill` + `aspect-ratio` works fine for static export — images just need to be committed
