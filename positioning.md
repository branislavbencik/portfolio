# Portfolio Positioning — Branislav Benčík

**Last updated:** April 21, 2026 (v2, post-workshop + hero lock)
**Status:** Locked
**Purpose:** The positioning source of truth. When this file conflicts with existing visual drafts or copy, this file wins. For the full source-of-truth hierarchy see `CLAUDE.md` → *Source-of-Truth Hierarchy*.

---

## The Claim

**Senior product designer who thinks in systems and can code well enough to build them.**

This is directional. The hero does not state this literally; it implies it through the "bag of things easily forgotten" concept (see Hero section below).

Explicit non-goals:
- Not "design engineer" as primary title (filters out of Senior PD searches)
- Not "designer who codes" as hero claim (too generic, widely used)
- Not "frontend developer who can also design" (reversal changes the offers received)

---

## Positioning scales (0-10)

| Dimension | Left (0) | Right (10) | Locked |
|---|---|---|---|
| UX vs UI | UX | UI | **3** |
| Systems vs Screens | Systems | Screens | **2** |
| Thinker vs Builder | Thinker | Builder | **5** |
| Deliverable vs Process docs | Deliverables | Process | **1** |
| Substance vs Polish | Substance | Polish | **2** |
| Breadth vs Depth | Wide | Deep | **6** |
| Personal vs Corporate voice | Personal | Corporate | **3** |
| IC vs Lead | Senior IC | Design lead | **3** |
| Narrative vs Tile grid | Narrative scroll | Flexible tiles | **4** |
| Quiet vs Loud | Quiet confident | Bold statement | **3** |

Resolve design questions toward the scales. Example: "Big visual hero or deliverable row?" Deliverable/Process = 1, Substance/Polish = 2, so deliverable row wins.

### Scale clarifications

- **Deliverable vs Process** is about what the site foregrounds (artifact vs. journey), not working style.
- **Substance vs Polish = 2** doesn't mean sloppy. Detail orientation is real; polish lives in systems, not decoration.
- **Thinker vs Builder = 5** acknowledges real shipping (Reprio, n8n, Apps Script). Not a retreat from "thinker."
- **Breadth vs Depth = 6** means 10+ industries unified by one lens (systems).
- **Quiet vs Loud = 3** means one bold claim, everything else nuance. The hero is one claim; no decorative festival.

---

## Hero (locked)

**Headline:**
> A bag of things easily forgotten.

**Subhead:**
> Empty states, 404s, keyboard shortcuts, loading skeletons, offline behavior. The stuff that backfires if you skip it.

**Why this works:**

- Signals detail obsession and systems thinking without stating either directly
- Specific list does what the claim alone cannot — proves the concern is real
- "Backfires if you skip it" is a designer-to-designer idiom, not a recruiter phrase
- No numbers, no "B2B," no three-part subtitle, no LinkedIn verbs

**Typographic treatment:**

- Headline: existing hero scale (~56-64px), same font weight as current
- Subhead: smaller (~18-20px), italic or monospace, softer color
- Left or center aligned per existing site convention — don't introduce new alignment
- Mobile: scales down to ~36-40px; subhead may break to two lines

**Constraints (what the hero must NOT do):**

- No illustration of the "bag" — the metaphor works implied
- No code notation (that's reserved for About opener)
- No animated reveal per word — breaks the quiet/loud = 3 lock
- No numbers, no chips, no LinkedIn slogans

**Reprio claim-to-evidence loop:** Because the hero claims edge-case obsession, the Reprio case study must include a body section surfacing edge-case details (empty state, keyboard shortcut overlay, loading skeleton, 404, offline). This closes the loop between hero and first proof.

---

## Proof stack

### Tier 1 — Full case studies

Narrative, body sections, 4-6 screens minimum, deliverables row at top.

1. **Reprio** — AI-driven task prioritization
   - Proves: ships code, AI-native, novel interaction design, edge-case obsession
   - Hero evidence: split-view reorder animation
   - Deliverables: live site, GitHub, demo mode
   - Must include: edge-case body section (closes hero loop)
   - Status: 95% complete, publishes after shell is swapped

2. **TeaTime** — B2B English learning (co-owned)
   - Proves: full-system ownership, AI pipeline design, business operator, service design
   - Hero evidence: Blueprint PRD, n8n pipeline
   - Deliverables: live site, Blueprint PDF, n8n share URL

3. **Skoala** — Financial literacy CMS (50%+ Czech schools)
   - Proves: scale, architecture decisions, "one content model, four outputs"
   - Hero evidence: CMS catalog, content model diagram
   - Deliverables: live site

### Tier 2 — Short-form

3 screens, one paragraph, link out. No narrative arc.

- **Crowdberry** — keep as-is

### Tier 3 — Cut

Sakura, Nnaisense, Shopify plugin, ML platform, assorted fintech. Concepts and smaller contributions. Default: cut. Acceptable as small tiles with one-line captions only if they genuinely serve breadth.

**Explicitly cut:** client logo wall, "30+ apps" brag.

---

## Landing grid

2-column grid, container 1144px. Container no wider than 1144.

Per-tile rest state:
- Image (full tile width, 4:3 aspect ratio)
- Title ("Reprio — AI-driven task prioritization")
- Description (one line, softer color)
- No chips, no tags, no shadows, no frames, no border-radius on images

Per-tile hover state:
- Panel slides up from bottom of image covering ~35% of image height
- Panel contains tags in small monospace, same treatment as deliverable pills
- 200ms ease-out
- Image dims slightly (~8%) under the panel edge
- No layout shift outside the tile

---

## Case study detail structure

Strict order:

```
[Back link]
[Deliverables row — Variant A, labeled cards]
[Breadcrumb: CASE STUDY · YEAR · ROLE]
[H1 — case study title]
[Context paragraph, ≤80 words]
[My contribution — 3-5 concrete bullets]
[Optional stats strip — only if relevant]

[Body section 1 — Variant B rhythm]
[Body section 2 — Variant B rhythm]
[Body section N — Variant B rhythm]

[Next project]
```

### Deliverables row — Variant A (locked)

Horizontal row of labeled link cards at the top. Each card:
- Small icon (lucide or inline SVG)
- Label in monospace (~12px)
- Arrow ↗ on right
- 1px border, transitions to solid fg on hover
- Min width ~180px

Not inline text. The deliverables are the proof; they get visual weight.

### Body section — Variant B rhythm (locked, consistent across all sections)

```
[Kicker — monospace, 11px, uppercase, mute]
[H2 — ~48px, letter-spacing tight, 2 lines max, carries the insight]
[Paragraph — ≤50 words (80 hard cap), only constraint or rationale]
[Image — ~900px wide, breaks out of 640 text column]
[Caption — monospace, 12px, what the screen solves not what UI shows]
```

Do not alternate rhythm. Every body section same pattern.

### Body cut test (hard rule)

Every paragraph must pass: *does this tell me something the screenshots cannot?* If it just describes the UI, cut it.

Current state fails this at roughly 40-50% of prose. Target rewrite: cut total body text by at least 40%.

---

## About section

**Brave level: 3/10 toward brave.** Philosophically direct, personally selective.

### Include

- Opener metaphor: `try { ship-interface() } catch { ... }` — the catch block is where design lives. Hero's "bag of things" sits in the catch block. About makes the code notation work as extension of the hero, not replacement.
- "Working hard is overestimated" thesis / optimize for laziness and clarity
- "Reality is never boring. Our interpretation is."
- The UX psychology line (say-do gap)
- Systems / minimalism / laziness as linked ideas
- Mentoring track record: 100h 1:1, 50h workshops, UX + HTML/CSS + React at ReactGirls Prague — single line, not a section
- Concise mentions of cooking, DJing, circus — one sentence each
- Monteiro quote or "Interface is no longer designed, it's engineered"

### Omit

- Psychonaut / psychedelics advocacy
- ADHD self-diagnosis
- Long "what is senior design" manifesto list

### Voice

First person, direct, personal. Philosophical bluntness acceptable. No performed enthusiasm.

---

## Visual constraints

- Container: 1144px
- Text column: 640px
- Image column: up to 900px with lightbox
- Typeface: Geist
- No shadows on landing tiles
- No frames around images
- No border-radius on case study images (sharp corners signal precision)
- Background: off-white (not pure white)
- Em dashes: banned
- Animations: serve content, small vocabulary, reuse consistently
- Micro-interactions over big animations

---

## What changes from pre-workshop state

| Problem | Fix |
|---|---|
| Hero says "Product designer fluent in B2B systems & code" + "20+ apps designed | AI-native" | Replace with "A bag of things easily forgotten." + forgotten-things list |
| Tag chips visible at rest on landing tiles | Move chips into hover-reveal bottom panel |
| Case study bodies overwritten (~40% bloat) | 80-word hard cap, 50-word target, Variant B rhythm |
| Card tiles may have shadows/frames | Remove both, clean 2-column grid |
| No deliverables row on case studies | Add Variant A labeled cards at top |
| Reprio not present | Build (after shell is swapped) |
| No About section with real voice | Write with code-notation opener + locked content |

## What does NOT change

- Existing copy voice (first person, short sentences, no em dashes)
- Typography system (Geist)
- Next.js 15 + Tailwind stack
- Domain: branislavbencik.com
- Application message voice (covered in sys prompt)

---

## Appendix — implementation notes

This section is editorial (not workshop output). It records decisions that resolve the gap between the locked positioning above and the current codebase, so future sessions don't re-litigate them.

### Container widths — held at repo values, 2026-04-22

Positioning specifies `Container: 1144px` and `Text column: 640px`. The repo currently ships `--max-width-frame: 1080px` and `--max-width-column: 560px` (see `src/app/globals.css`). The 1080 width was tuned for 14" MacBook fold in `docs/STATUS.md` item 30 (2026-04-14).

**Decision (2026-04-22):** hold the repo values. Treat positioning's 1144/640 as directional — the spirit is "don't go wider than ~1144," which 1080 satisfies. Revisit if a Tier-1 case study (Reprio) visibly suffers at 1080.

The image column target of "~900px wide" is similarly held at `--max-width-figure: 800px`.
