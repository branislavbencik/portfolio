# branislavbencik.com

Portfolio of **Branislav Benčík**, Senior Product Designer.

**[→ branislavbencik.com](https://branislavbencik.com)** · [LinkedIn](https://www.linkedin.com/in/branislavbencik/)

---

## What's here

A static portfolio site: landing page, long-form case studies, and selected project pages.

- **Case studies:** [Skoala](https://branislavbencik.com/skoala), [TeaTime](https://branislavbencik.com/teatime)
- **Selected projects:** [NNspect](https://branislavbencik.com/nnspect), [Sakurabook](https://branislavbencik.com/sakurabook), [Crowdberry](https://branislavbencik.com/crowdberry)

Live build status and the session-by-session changelog live in [`docs/STATUS.md`](docs/STATUS.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · [Keystatic](https://keystatic.com) (git-backed CMS) · Motion · Playwright · Geist (Sans, Mono, Pixel Square)

Content is Keystatic-backed YAML under `src/content/projects/`. Every case study and selected project is rendered from a single `src/app/[slug]/page.tsx` template via `generateStaticParams`, so all project pages are pre-rendered at build time. Keystatic's admin UI lives at `/keystatic` for local editing.

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
| `src/app/` | Routes. All project pages render from `[slug]/page.tsx` against Keystatic content |
| `src/app/keystatic/` | Keystatic admin UI (local content editing) |
| `src/components/` | Shared React components |
| `src/content/projects/` | Project content + metadata (YAML, edited via Keystatic) |
| `public/images/{project}/` | 2× Figma exports per project |
| `docs/STATUS.md` | Living build log and session journal |
| `CLAUDE.md` | Instruction set Claude Code reads at session start |
| `docs/DESIGN.md` | Design bible — absolute source of truth for aesthetics |
| `.claude/commands/ship.md` | End-of-session ship flow (build, commit, PR) |
| `scripts/audit-tokens.sh` | Guardrail: fails on hardcoded values outside the token system |

## Built with Claude Code

Design is extracted from Figma, implementation is driven by [Claude Code](https://docs.anthropic.com/en/docs/claude-code), and every session is reviewed and iterated by me.

The repo is set up so an AI collaborator can hold its own against the codebase without drifting: [`CLAUDE.md`](CLAUDE.md) defines the token system, responsive strategy, and session rules; [`docs/DESIGN.md`](docs/DESIGN.md) is the aesthetic bible; [`scripts/audit-tokens.sh`](scripts/audit-tokens.sh) fails the build if hardcoded values sneak in; and [`.claude/commands/ship.md`](.claude/commands/ship.md) is the standard ship flow: build, verify the README against reality, commit, push, update `STATUS.md`, open a PR.

Deployed to Vercel on every merge to `main`.
