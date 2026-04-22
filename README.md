# branislavbencik.com

Portfolio of **Branislav Benčík**, Senior Product Designer.

**[→ branislavbencik.com](https://branislavbencik.com)** · [LinkedIn](https://www.linkedin.com/in/branislavbencik/) · [Resume](https://branislavbencik.com/resume.pdf)

---

## For hiring managers

Senior product designer who thinks in systems and can code well enough to build them. Ten-plus years across EdTech, Fintech, Industrial AI, and ecommerce — the through-line is *systems*, not the domain.

The two full case studies below are the proof:

- **[Skoala](https://branislavbencik.com/skoala)** — CMS powering a financial literacy platform used by 3,500+ Czech schools. Proves scale, content architecture, and the "one content model, four outputs" decision.
- **[TeaTime](https://branislavbencik.com/teatime)** — B2B language school, co-owned. Proves full-system ownership: client acquisition pipeline, AI-evaluated speaking test, n8n automation. Service design plus business operator.

Short-form work: [Crowdberry](https://branislavbencik.com/crowdberry) (Fintech investor UX), [NNspect](https://branislavbencik.com/nnspect) (ML platform concept), [Sakurabook](https://branislavbencik.com/sakurabook) (Shopify plugin, shipped in Japanese).

## What this site is about

> A bag of things easily forgotten. Empty states, 404s, keyboard shortcuts, loading skeletons, offline behavior. The stuff that backfires if you skip it.

The thesis is in [`positioning.md`](positioning.md) (locked April 2026): edge cases, systems thinking, and shipping real code are the craft. Everything else — voice, component choices, animation restraint — follows from there.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · [Keystatic](https://keystatic.com) (git-backed CMS) · Motion · Playwright · Geist (Sans, Mono).

Vercel pre-renders every project page at build time via `generateStaticParams` — no SSR, no end-user API. Project content lives in `src/content/projects/*.yaml` and is edited through Keystatic's admin UI at `/keystatic` (local-dev only). All five project pages render from a single `src/app/[slug]/page.tsx` template.

## Run it locally

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build            # production Next build
npm run test:responsive  # Playwright checks across breakpoints
npm run audit:tokens     # flags hardcoded colors / sizes / inline styles
```

## Repo map

| Path | What lives here |
|---|---|
| `positioning.md` | Locked portfolio positioning — claims, hero copy, proof stack, prose caps |
| `docs/DESIGN.md` | Visual system — tokens, components, image modes, spacing, motion |
| `.impeccable.md` | Design context for `/impeccable`, `/emil-design-eng`, `/playground` |
| `CLAUDE.md` | Instruction set Claude Code reads at session start |
| `src/app/` | Routes. All project pages render from `[slug]/page.tsx` against Keystatic content |
| `src/app/keystatic/` | Keystatic admin UI (local editing only) |
| `src/components/` | Shared React components |
| `src/content/projects/` | Project content + metadata (YAML, edited via Keystatic) |
| `public/images/{project}/` | 2× Figma exports per project |
| `docs/STATUS.md` | Living build log and session journal |
| `.claude/commands/ship.md` | End-of-session ship flow (build, commit, PR) |
| `scripts/audit-tokens.sh` | Guardrail: fails on hardcoded values outside the token system |

---

## Built with Claude Code

Design is extracted from Figma, implementation is driven by [Claude Code](https://docs.anthropic.com/en/docs/claude-code), and every session is reviewed and iterated by me. The repo is set up so an AI collaborator can hold its own against the codebase without drifting.

### Source-of-truth hierarchy

```
positioning.md > docs/DESIGN.md > .impeccable.md > CLAUDE.md > README.md > docs/STATUS.md
```

When two docs disagree, the higher layer wins. To change positioning, open an explicit positioning session: bump `positioning.md`, then propagate the change downward (audit DESIGN / .impeccable / README / code in one follow-up session). Never let two layers silently disagree.

### What Claude reads on every session

- `CLAUDE.md` — tech stack, session rules, responsive strategy, code-quality rules
- `docs/DESIGN.md` — visual tokens and component rules (read before any UI change)
- `.impeccable.md` — design context: personas, brand voice, aesthetic references, anti-references
- `positioning.md` — loaded on demand when hero copy or claims are in scope

### Skills used most

- **`/impeccable craft`** — the full shape-then-build flow for new surfaces. Reads `.impeccable.md` for brand voice and reference set, then picks components accordingly. Used when a new case study or section needs shape before code.
- **`/emil-design-eng`** — Emil Kowalski's philosophy on polish, component design, and animation decisions. Called when something works functionally but reads as "made by AI" — it pushes toward the invisible details that make software feel intentional.
- **`/playground`** — single-file HTML explorers when I want to shape-test a component with visual controls before wiring it into the app. Returns a draft + a copyable prompt.

### Want to change default Claude behavior?

- New visual rule or token → `docs/DESIGN.md`
- New positioning claim or hero copy → `positioning.md` (locked — open a positioning session)
- New tech, session, or code-quality rule → `CLAUDE.md`
- New personal voice, aesthetic reference, or anti-reference → `.impeccable.md`
- New local permission or hook → `.claude/settings.json` (project, shared) or `.claude/settings.local.json` (per-machine, gitignored)

### Ship flow

`.claude/commands/ship.md` — build, README drift check, commit, push, `STATUS.md` update, open PR. Invoked via `/ship`. Deployed to Vercel on every merge to `main`.
