# Portfolio Positioning — Branislav Benčík

**Last updated:** April 22, 2026 (v3, generalist pivot + superscript-citation hero + editorial card rebuild)
**Status:** Locked
**Purpose:** Strategic claims, hero copy, proof stack, card interaction, voice, and design context for AI skills. When this file conflicts with existing visual drafts or code, this file wins. For the full source-of-truth hierarchy see `CLAUDE.md` → *Source-of-Truth Hierarchy*.

---

## The Claim

**Generalist product designer. Useful anywhere from strategy and systems thinking down to code and edge cases.**

The generalism is the specialty — not weakness, not jack-of-all-trades hedging. Technical fluency expands the design capability (more feasible solutions, deeper engineering collaboration); it is not a separate identity.

Explicit non-goals:
- Not "design engineer" as primary title (filters out of Senior / generalist PD searches)
- Not "designer who codes" (too generic, widely used)
- Not "senior product designer specializing in X" (narrows the range the hero now claims)

v2 → v3 shift (April 21 → April 22): the "bag of things easily forgotten" framing was too narrow. Skoala and TeaTime are systems-level work; the hero now matches the actual range, and superscript citations anchor every abstract claim to a real deliverable.

---

## Positioning scales (0–10, held from v2)

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

Scale clarifications:
- **Deliverable/Process = 1** — site foregrounds artifacts, not journey.
- **Breadth/Depth = 6** — 10+ industries unified by one lens (systems).
- **Quiet/Loud = 3** — one bold claim, everything else nuance. The hero lists five citations but makes one argument.

Resolve design questions toward the scales. Example: "big visual hero or deliverable row?" → Deliverable = 1, Substance = 2 ⇒ deliverable row wins.

---

## Hero (locked)

### Copy — verbatim, do not paraphrase

> Hi, I'm Branislav — a generalist product designer. I happen to be useful anywhere from re-thinking the learning system<sup>(Blueprint↗)</sup>, to shipping the automations<sup>(n8n↗)</sup>, prototypes<sup>(Schneider↗)</sup>, and code<sup>(Reprio↗)</sup> — and down the rabbit hole to the states and exceptions<sup>(Skoala↗)</sup>, because those always backfire when skipped.

Kicker (below hero, tertiary color, sentence case):

> Previously @Applifting · Co-founded TeaTime

### Citation → deliverable map

| Label | Links to | Proves |
|---|---|---|
| Blueprint | TeaTime PRD (PDF) | Systems thinking, strategy as craft |
| n8n | TeaTime n8n shared workflow | Automation infrastructure |
| Schneider | Schneider Electric prototype | Design sprint + shippable prototype |
| Reprio | reprio.vercel.app | Standalone code, built alone |
| Skoala | Skoala case study (states/flow section) | Design states and exceptions |

### Why this architecture works

- One unified argument, not a list. "Useful anywhere from X to Y — and down the rabbit hole to Z" reads as a single claim with two registers (strategic → tactical).
- Voice is intentionally imperfect. "I happen to be useful" is the Branislav register. Do not sand this into "I am useful" or "I am a generalist who works across…"
- Superscript citations do triple duty: proof (readers click), craft signal (academic-footnote register), range signal (five different *kinds* of evidence in one sentence).
- Em-dashes here are load-bearing (apposition + register shift). They stay. The em-dash rule in `docs/DESIGN.md` has been softened to "purpose-driven only."

### Typography — hero prose (not display)

| Property | Value |
|---|---|
| Font | Geist Sans |
| Size | 30px |
| Weight | 400 |
| Line height | 130% |
| Letter spacing | -1.5% |
| Color | `--fg` (Zinc 900) |

This is *prose*, not display. 30px in paragraph form, not a 48px banner. Register: "this is the thing you read first," not "this is the thing that shouts."

Kicker: Geist Sans 14px / 140% / 0 / `--fg-tertiary`. Separator is ` · `, not em-dash.

### Citation link styling (two-tier color system)

- **Blue (`#0000FF` — temporary; final TBD in range `#2F4BB8`–`#3A56C2`)** = citation / proof links only. Used on hero superscripts and case-study evidence callouts.
- **Black / inherit** = every other link on the site (nav, case-card titles, body links, footer).
- Parentheses kept as visual scope: `(Blueprint↗)` not `Blueprint↗`.
- Superscript position flush against the preceding word, no leading space.
- `↗` arrow on every citation for consistency. On hover: arrow animates 2px up-and-right; `text-decoration: underline` added.
- Hover color: one step darker than rest (same hue family, never a different color).

Never introduce a third link color. If a new link class appears, it fits an existing class — or the classification is wrong.

### Constraints — what the hero must NOT do

- No "senior product designer" (changed from v2; generalism subsumes seniority)
- No matrix scramble, no animated reveal per word, no zoom metaphor in visual
- No chips, no metric badges, no LinkedIn slogans
- No rewording. Every word was workshopped; the imperfection is deliberate.

---

## Proof stack

### Featured (landing grid, star-metric cards)

1. **Skoala** — financial literacy platform for kids
   Tags: ⭐ 50% market reach · Lead Designer · Design Sprint
   Proves: scale, state/exception design, CMS architecture. Carries the hero's `(Skoala↗)` states-and-exceptions citation.

2. **Teatime** — redesigning a B2B language school (co-owned)
   Tags: ⭐ +12 B2B Clients · Service Design · Co-founder
   Proves: full-system ownership, AI pipeline, service design, business operator. Carries two hero citations: `(Blueprint↗)` and `(n8n↗)`.

3. **Crowdberry** — crowdfunding investment platform
   Tags: ⭐ €100M+ invested · KYC & AML flows · Usability testing
   Proves: regulated flows at enterprise scale.

### Supporting (landing grid, no star)

4. **Nnspect** — ML training platform for material quality inspection
   Tags: Concept · Industrial AI · Solo Designer

5. **Sakurabook** — Shopify plugin for per-hour booking in Japan
   Tags: i18n · Ecosystem of multiple apps

6. **Schneider Electric** — AI-guided panel building configurator
   Tags: Prototype · Design Sprint
   Note: unsuccessful commercially but strong deliverable; fills the portfolio's prototype gap. Carries hero's `(Schneider↗)` citation.

### Hero-only (not on landing grid)

- **Reprio** — reprio.vercel.app. Cited in hero as code evidence. Standalone app, no landing tile.

### Explicitly cut

Client logo wall. "30+ apps" brag. Assorted concept-only fintech.

---

## Landing grid

### Grid

- 2 columns × 3 rows = 6 cards visible
- Container: **1080px** (canonical; retires v2's 1144)
- Card width: **528px** (`(1080 - 24) / 2`)
- Gap: **24px**

### Per-tile rest state — no frame

Bare editorial composition. **No card border, no background fill, no surrounding padding box.** The thumbnail is itself a bounded rectangle; text below doesn't need an additional frame.

Vertical rhythm inside a tile:

```
[Thumbnail — 528 × 396 (4:3), sharp corners, no radius, no shadow, no frame]
[Meta row — Geist Mono allcaps — "Case Study" (or "Selected project") · YEAR · ROLE]
[Title — 22px Geist Sans Medium]
[Description — 14px Geist Sans Regular, one line]
```

Tags are **hidden at rest** — they live in the hover/focus reveal panel.

### Per-tile hover state — reveal panel

- **Panel height ≈ 12% of thumbnail** (~40px absolute at 528 × 396). Matches the tag-row intrinsic height. Not 35%.
- Panel content: tags as `type-allcaps` (Geist Mono 12px, `·`-separated, **no chip styling, no pill borders** — bare text only).
- Panel background: `--background` (canvas; continuous with page). Border-top 1px is the only separator.
- `pointer-events: none` so the panel doesn't flicker on edge.

### Motion — two modes

**B1 Clean — universal baseline:**
- Panel: `transform: translateY(100% → 0)` over **200ms** with `cubic-bezier(0.23, 1, 0.32, 1)`
- Image: `filter: brightness(0.94)` (subtler than v2's 0.92)

**B2 Zoom — opt-in per card:**
- B1 baseline plus `transform: scale(1.02)` on the image
- Apply to photo-heavy thumbnails only: Skoala, Teatime, Crowdberry
- Skip on diagram-heavy thumbnails (Nnspect, Schneider) — zoom crops meaningful edges

**Explicitly rejected:**
- B3 Desaturate (breaks on already-muted thumbs)
- B4 Title shift (4px is below perceptual threshold)
- B5 Cascade (500ms total; outlives the scan)

### Keyboard parity

`:focus-within` on the card link triggers the identical reveal. Tab navigation shows tags the same as hover — no assistive-tech gap.

### Reduced motion

`prefers-reduced-motion: reduce` → panel renders static (tags always visible); no translate, no brightness change, no scale.

### Layout discipline

- Cards do not shift siblings on hover (reveal panel is absolutely positioned within the thumbnail).
- 6 cards visible immediately — no "show more," no infinite scroll.
- Row order: three star-cards first row, three supporting second row. Left-to-right scan emphasizes headline metrics.

---

## Case study detail structure (unchanged from v2)

```
[Back link]
[Deliverables row — Variant A, labeled cards]
[Breadcrumb: CASE STUDY · YEAR · ROLE]
[H1 — case study title]
[Context paragraph, ≤80 words]
[My contribution — 3–5 concrete bullets]
[Optional stats strip — only if relevant]

[Body section 1 — Variant B rhythm]
[Body section 2 — Variant B rhythm]
[Body section N — Variant B rhythm]

[Next project]
```

**Deliverables row (Variant A):** horizontal row of labeled link cards at top. Each card: lucide icon + monospace label (~12px) + arrow ↗. 1px border transitioning to solid fg on hover. Min-width ~180px.

**Body section (Variant B rhythm):**

```
[Kicker — Geist Mono, 11px, uppercase, muted]
[H2 — ~48px, tight letter-spacing, 2 lines max, carries the insight]
[Paragraph — ≤50 words (80 hard cap), only constraint or rationale]
[Image — ~800px wide, breaks out of 560 text column]
[Caption — Geist Mono, 12px, what the screen solves]
```

Body cut test (hard rule): every paragraph must pass — *does this tell me something the screenshots cannot?* If it just describes the UI, cut it. Target ≥40% reduction versus pre-workshop drafts.

---

## About section

Brave level: 3/10 toward brave. Philosophically direct, personally selective.

### Opener

> Design as navigating competing parameters of a system in favor of dominant evidence about the user group and its offering.

Academic register, single-paragraph thesis. Motivates the "generalist" framing in the hero.

### Opinions (with room to defend them)

- **Minimal awesome product, not MVP.** Iteration isn't enough if you ship zero decent features.
- **Skepticism of set-in-stone methodologies** (design thinking, etc.). Innovation is messy; company / product / culture override methodology every time. In favor of minimal, context-tweaked processes.

### Include (from v2)

- Mentoring: 100h 1:1, 50h workshops, UX + HTML/CSS + React at ReactGirls Prague — single line
- Cooking, DJing, circus — one sentence each

### Omit (from v2)

- Psychonaut / psychedelics advocacy
- ADHD self-diagnosis
- Long "what is senior design" manifesto list

### Voice

First person, direct, personal. Philosophical bluntness acceptable. No performed enthusiasm.

---

## Craft section (landing, below the grid)

The original "bag of things easily forgotten" copy relocates here — not dead, correctly positioned. Introduces a small sub-grid of micro-artifacts.

Sketch:

> **Craft.** Every designer carries a bag of things they shouldn't forget. Mine lives here.
>
> [Sub-grid: empty state · 404 · loading skeleton · keyboard shortcut overlay · offline indicator]

---

## Voice — Design Context (for `/impeccable`, `/emil-design-eng`, `/playground`)

> Canonical location. `.impeccable.md` is a thin pointer; do not duplicate content there.

### Primary audience

Design Lead / Head of Design evaluating a Senior / generalist PD hire. Design-literate, impatient with fluff, immediately recognizes craft. Target employers: FTMO, Nebius, n8n, Make, Productboard, Apify, JetBrains.

### Secondary audience

Recruiter as filter. Less design-literate; pattern-matches on legibility, clarity, seriousness of work.

### Job to be done

Full-time role evaluation. "Can this person think, and can they ship?" The portfolio answers both — strategic depth in case studies, precision in the UI itself.

### Brand personality — three words

**Precise · Deliberate · Personal.**

- *Precise* — every element earns its place. Pixel-level discipline.
- *Deliberate* — nothing is accidental. Every decision considered.
- *Personal* — Branislav's voice, not a brand voice. "I happen to be useful" over "I am a product designer." Warmer than cold, more honest than polished.

(Shift from v2: "Dense" moved to the DESIGN.md execution layer; "Cold" replaced by "Personal" — the generalist frame is human, not clinical.)

### Aesthetic direction — Editorial Light Technical

Carries forward the "Light Technical Canvas" (off-white, zinc palette, sharp corners, hard 1px structure) but removes the full-card-frame treatment. Shipping read is closer to **marijanapav.com** than Vercel: bare thumbnails, text below, no surrounding chrome. Devtool-precise, not dashboard-decorated.

References:
- **marijanapav.com** — bare-frame card treatment, editorial rhythm (primary reference v3)
- **Vercel / Linear** — monochrome restraint, typography precision
- **Warp** — terminal precision

Anti-references:
- Glassmorphism, animated hero parallax, marketing-voice copy, rounded "bubbly" UI, Awwwards-style decorative portfolios
- **Chip-style tags** (new in v3) — ship bare text with `·` separators, never pill chips
- **Full-card frames** (new in v3) — no `border` + `background: #fff` wrapper around the whole card

Theme: **Light.** Color: **achromatic** except for citation blue. Color otherwise only inside work screenshots.

### Design principles

1. **The interface is the portfolio.** UI demonstrates the same craft as the case studies.
2. **Density over decoration.** Show more information with better hierarchy, not whitespace-as-design.
3. **Functional quirks only.** Motion serves clarity/feedback, never decoration.
4. **Direct copy, no marketing voice.** Headlines are statements, not pitches.
5. **Trust the system.** positioning.md → docs/DESIGN.md → globals.css. When layers disagree, the higher layer wins.

---

## Visual constraints (canonical v3)

| Token | Value | Notes |
|---|---|---|
| Container | **1080px** | Frame width (retires v2's 1144) |
| Card | **528px** | `(Container − Gap) / 2` |
| Gap | **24px** | Between cards (landing grid) |
| Text column | **560px** | Case study body prose |
| Figure | **800px** | Default image mode |
| Typeface | Geist Sans + Geist Mono | No other fonts |

- Background: off-white (`#F9FAFB`), not pure white
- Borders: `#D4D4D8` (Zinc 300), 1px hard
- **Em-dashes: purpose-driven only** (apposition, register shift). Softened from v2's blanket ban. Never as AI-prose pacing.
- No shadows on landing tiles
- No border-radius on layout surfaces (interactive elements only: 2–4px)
- Sharp corners on case study images
- Animations: serve content, small motion vocabulary, reuse consistently

---

## v2 → v3 change log

| Problem (v2, April 21) | Fix (v3, April 22) |
|---|---|
| Hero was "A bag of things easily forgotten" — too narrow for actual range | Generalist superscript-citation paragraph; five linked deliverables |
| "Senior product designer" as identity | "Generalist product designer" — generalism IS the specialty |
| No chips visible at rest, hover panel covers 35% | Tags hidden at rest, hover panel covers ~12% (tag-row intrinsic height) |
| Cards framed with `border-t + border-b` structural separators | No card frame — bare thumbnail + text below (marijanapav.com register) |
| Em-dashes banned entirely | Allowed for apposition / register shift only |
| Single link color | Two-tier: blue for citations, default for everything else |
| Container 1144 / text 640 (aspirational) vs 1080 / 560 (actual) | Canonical 1080 / 560; 1144 retired |
| Schneider Electric cut | Added as sixth landing card (fills prototype gap) |
| Reprio as Tier 1 landing tile | Reprio cited in hero only; no landing tile |
| "Coldly Calculated" brand register | "Precise · Deliberate · Personal" |

### What does NOT change

- Voice: first person, short sentences, intentional imperfections
- Typography system: Geist Sans + Geist Mono
- Next.js 16 + Tailwind 4 stack
- Domain: branislavbencik.com
- About page philosophy opener
- Case study detail structure (Variant A deliverables row + Variant B body rhythm)

---

## Appendix — implementation notes

### 1080 / 528 / 24 grid — canonical, 2026-04-22

v2 specified 1144 / 640 but the repo shipped 1080 / 560 (tuned for 14" MacBook fold, `docs/STATUS.md` item 30, 2026-04-14). v3 retires the 1144 target. **Canonical values are 1080 / 528 / 24.** Earlier drafts mentioning 1144 are superseded.

Image column target (`--max-width-figure: 800px`) is held; the 900px aspiration from v2 is informational, not canonical.

### Em-dash softening — 2026-04-22

v2 banned em-dashes blanket-style as an AI-prose tell. v3 workshop showed the hero's two em-dashes are load-bearing (apposition on "Branislav — a generalist product designer"; register shift on "code — and down the rabbit hole"). New rule:

- Permitted when they do structural work (apposition, register shift, parenthetical aside).
- Banned when they substitute for a comma or period to create AI-prose cadence.
- Reviewer test: can you replace the dash with a comma or period without losing meaning? If yes, use that instead.

### Link-color two-tier — 2026-04-22

Blue = citation only. Black = everything else. Never add a third color — if a new link class appears, it fits an existing class or the classification is wrong. This is a systems-thinking signal, not an aesthetic choice.

### Card wrapper — no-frame decision — 2026-04-22

Three playgrounds (`playground/tag-variations.html`, `playground/chip-interaction-patterns.html`, `playground/hover-reveal-variants.html`) all defaulted to full 1px border + `#fff` background wrappers. The /emil-design-eng review caught this as the single biggest craft tell — fights the editorial intent. v3 locks: no wrapper, bare thumbnail + text, marijanapav.com register.
