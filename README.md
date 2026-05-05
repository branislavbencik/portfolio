# branislavbencik.com

Portfolio of **Branislav Benčík**, Senior Product Designer.

**[→ branislavbencik.com](https://branislavbencik.com)** · [LinkedIn](https://www.linkedin.com/in/branislavbencik/)

---

## What's here

A static portfolio site: landing page, long-form case studies, and selected project pages.

- **Case studies:** [Skoala](https://branislavbencik.com/skoala), [TeaTime](https://branislavbencik.com/teatime)
- **Playground:** [Reprio](https://reprio.vercel.app/) (live product, linked from the landing page)
- **Selected projects:** [Schneider](https://branislavbencik.com/schneider), [NNspect](https://branislavbencik.com/nnspect), [Sakurabook](https://branislavbencik.com/sakurabook), [Crowdberry](https://branislavbencik.com/crowdberry)

Live build status and the session-by-session changelog live in [`docs/STATUS.md`](docs/STATUS.md).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · [Keystatic](https://keystatic.com) (git-backed CMS) · Motion · Playwright · Geist (Sans, Mono)

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

Design is extracted from Figma, implementation is driven by [Claude Code](https://docs.anthropic.com/en/docs/claude-code), and every session is reviewed and iterated by me. The interesting part isn't *that* I use an AI — it's the scaffolding around it. The rest of this section is what's actually working, in case any of it is useful to lift.

### The MDs are the system

Each markdown has exactly one job. CLAUDE.md says it explicitly: "If two docs disagree, escalate — don't silently resolve."

| File | What it owns |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | Code conventions, session rules, doc map, conflict order |
| [`.impeccable.md`](.impeccable.md) | Brand: audience, voice, design principles, anti-references |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Visual system: tokens, type scale, color, layout, components |
| [`GUIDELINES.md`](GUIDELINES.md) | Behavior: interactions, motion, a11y, performance, microcopy |
| [`docs/STATUS.md`](docs/STATUS.md) | Session-by-session changelog |
| [`.claude/commands/ship.md`](.claude/commands/ship.md) | End-of-session ship recipe |

Most setups I've seen pile everything into one bloated CLAUDE.md, which means the AI picks whichever instruction it saw last. Splitting by *domain* (brand vs visuals vs behavior vs code) and naming the conflict-resolution order keeps things honest.

### Skills I lean on

Skills are named, reusable playbooks the AI can invoke — they keep decisions consistent across sessions, and a few of them act as **adversarial guardrails against the model's own training-set defaults**.

- [`impeccable`](.claude/skills/impeccable/) — house design skill, runs `craft` / `teach` / `extract` modes
- `impeccable critique` — calls out **AI slop**: generic gradients, cargo-culted glassmorphism, hover-scale on text, monotone grids. A second pair of eyes against the LLM's own instincts.
- `emil-design-eng` — Emil Kowalski's UI-polish philosophy, used for animation and detail decisions
- The wider design family used situationally: `polish`, `typeset`, `arrange`, `distill`, `bolder`, `quieter`, `colorize`, `delight`, `harden`
- `superpowers:brainstorming` before creative work; `superpowers:writing-plans` for multi-step tasks
- **Playground-driven variant decisions.** For any 3+ visual options, scaffold a `/playground` page rendering them at real dimensions — compare in code, not in chat.
- The **Vercel plugin** auto-loads current platform guidance at session start (Edge Functions deprecated, Fluid Compute default, Node 24 LTS, `vercel.ts` config) and ships skills like `vercel:react-best-practices` that auto-trigger after multi-file TSX edits with a focused checklist
- [`/ship`](.claude/commands/ship.md) closes out a session: build → commit → push → update STATUS.md → open PR

### The status line is the dashboard

A custom statusline script (`~/.claude/statusline.sh`, ~95 lines of bash) renders three readouts on every prompt:

1. **Model + working dir + branch** — so I always know which worktree this session is in
2. **Context-window progress bar** — 15-block bar, green under 50%, yellow 50–75%, red over 75%. Tells me when to `/compact` or end the session before the auto-compact ruins the working memory
3. **Live dev-server segment** — `lsof` finds any `next-server` / `vite` / `astro dev` / `nuxt dev` / `bun dev` process listening on TCP, filters to ones whose `cwd` is inside this repo, and prints `:port branch-it's-running-for`. Empty when no server is up.

The dev-server segment matters more than it sounds. I run multiple worktrees in parallel (one per task), each on its own port (`:3000`, `:3001`, …). The terminal / tmux status bar shows the port of *the parent shell*, which is misleading the second a sibling worktree starts a server. The custom statusline reads from `lsof` directly, so it can't lie. Combined with the convention that **the AI starts a dev server for any visual work and surfaces `http://localhost:<port>` at the top of every reply**, the bar makes "is the URL I'm telling you to open actually live, on the right branch?" answerable at a glance — closes the gap where an AI claims "ship it, looks great" without having actually rendered it.

### Practices worth stealing

- **Quantified comparison tables.** Multi-option decisions go through a scored 0–10 table with an honest "status quo" column, so the bar to change is visible.
- **One deliverable per session, worktree-isolated.** A `cc <branch>` shell function spins up a worktree per session; `/ship` closes it out.
- **STATUS.md as the living journal.** Session-by-session changelog, kept separate from the README so the README can stay about *what is*, not *what happened*.

Deployed to Vercel on every merge to `main`.
