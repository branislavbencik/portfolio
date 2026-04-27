// Typography fine-tuning playground.
// Compares Geist OpenType stylistic sets and mobile-only typography overrides
// against the live hero composition. Not linked from nav.
//
// Geist Sans stylistic sets verified from the font's GSUB feature table:
//   ss01  No tail a       ss02  Alt a            ss03  Alt l
//   ss04  Alt R           ss05  Alt I            ss06  Alt G
//   ss07  Alt arrows      ss08  Rounded dot      ss09  Alt numbers
//   ss10  Alternative enclosing shapes           ss11  Contextual brand styles

import CitationLink from "@/components/CitationLink";

const PRD_HREF =
  "https://clever-statistic-860.notion.site/PRD-Personalized-English-Learning-System-34ee84d8cf3f808cbff3d01f55d39e49?pvs=73";
const N8N_HREF = "https://share-n8n.com/shared/888fkQf1zCAc";
const SCHNEIDER_HREF =
  "https://www.figma.com/proto/YqwEFpw4xULPZhkk8G71rp/Schneider-Electric-%7C-Design-Sprint-Prototype?node-id=28343-3731";
const SIDEPROJECT_HREF = "https://reprio.vercel.app/";
const SKOALA_HREF =
  "https://www.figma.com/design/ElwxrYVb8YgqCfU1P6aIWE/Skoala-%7C-Teacher-Platform-Beta--Copy-?node-id=15633-97847";

function LedeBody() {
  return (
    <>
      I tend to be useful anywhere from re-thinking the learning system
      <CitationLink label="PRD" href={PRD_HREF} external />, through shipping the automations
      <CitationLink label="n8n" href={N8N_HREF} external />, prototypes
      <CitationLink label="Schneider" href={SCHNEIDER_HREF} external />, and code
      <CitationLink label="Sideproject" href={SIDEPROJECT_HREF} external />. Sometimes I go all the way down the rabbit hole to map states
      <CitationLink label="Skoala" href={SKOALA_HREF} external /> and exceptions.
    </>
  );
}

interface HeroBlockProps {
  fontFeatureSettings?: string;
}

function HeroBlock({ fontFeatureSettings }: HeroBlockProps) {
  return (
    <div className="flex flex-col gap-6" style={{ fontFeatureSettings }}>
      <div className="flex flex-col gap-0">
        <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
        <h3 className="type-display text-text-primary">Generalist Product Designer.</h3>
      </div>
      <p className="type-lede text-text-primary max-w-lede">
        <LedeBody />
      </p>
    </div>
  );
}

interface VariantSectionProps {
  id: string;
  name: string;
  spec: string;
  note?: string;
  children: React.ReactNode;
}

function VariantSection({ id, name, spec, note, children }: VariantSectionProps) {
  return (
    <section className="border-b border-surface-2">
      <div className="max-w-frame mx-center max-lg:px-content-x py-section">
        <header className="mb-12 max-w-column">
          <p className="type-allcaps text-text-secondary mb-2">Block {id}</p>
          <h2 className="type-subheading text-text-primary mb-2">{name}</h2>
          <p className="type-caption text-text-secondary font-mono">{spec}</p>
          {note && (
            <p className="type-caption text-text-secondary mt-2 italic">{note}</p>
          )}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}

// ── Helpers for the mobile-simulation blocks ───────────────────────
//
// These render mobile-token values at desktop size so the user can compare
// without resizing the viewport. They forcibly set font-size: 40px (the
// mobile --font-size-display value) and explicit tracking / line-height.

interface ForcedDisplayProps {
  letterSpacing: string;
  lineHeight: number;
}

function ForcedMobileDisplay({ letterSpacing, lineHeight }: ForcedDisplayProps) {
  return (
    <h3
      className="text-text-primary"
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        fontSize: 40,
        fontWeight: 700,
        lineHeight,
        letterSpacing,
      }}
    >
      Generalist Product Designer.
    </h3>
  );
}

function ForcedMobileByline({ lineHeight }: { lineHeight: number }) {
  return (
    <p
      className="text-text-primary"
      style={{
        fontFamily: "var(--font-vc-honey), Georgia, serif",
        fontSize: 40,
        fontWeight: 400,
        lineHeight,
        letterSpacing: 0,
      }}
    >
      Hi, I&apos;m Branislav,
    </p>
  );
}

// Inline citation simulator — mimics the post-2b mobile behavior on desktop
// (no superscript lift, no parens, body-size colored link).
function InlineCitation({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="citation"
      target="_blank"
      rel="noopener noreferrer"
      style={{ fontFamily: "inherit" }}
    >
      {label}
      <span className="citation-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

// Lede with inline citations (forced) — used in Block H for direct comparison
function InlineLedeBody() {
  return (
    <>
      I tend to be useful anywhere from re-thinking the learning system{" "}
      <InlineCitation label="PRD" href={PRD_HREF} />, through shipping the automations{" "}
      <InlineCitation label="n8n" href={N8N_HREF} />, prototypes{" "}
      <InlineCitation label="Schneider" href={SCHNEIDER_HREF} />, and code{" "}
      <InlineCitation label="Sideproject" href={SIDEPROJECT_HREF} />. Sometimes I go
      all the way down the rabbit hole to map states{" "}
      <InlineCitation label="Skoala" href={SKOALA_HREF} /> and exceptions.
    </>
  );
}

export default function TypographyPlaygroundPage() {
  return (
    <main>
      <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-secondary mb-3">Design lab</p>
        <h1 className="type-heading text-text-primary mb-4">Typography fine-tuning</h1>
        <p className="type-body text-text-secondary max-w-column mb-6">
          Visual comparisons for hero typography polish: Geist OpenType
          stylistic sets, mobile letter-spacing, mobile line-height, and the
          mobile citation register shift. The site has{" "}
          <code className="font-mono">ss08</code> (Rounded dot) applied
          site-wide on <code className="font-mono">:root</code>; Block A
          turns it off as a baseline reference.
        </p>
        <ul className="type-caption text-text-secondary list-none flex flex-col gap-1 font-mono">
          <li>A. Status quo (no OpenType features)</li>
          <li>B. ss08 — Rounded dot (current site default)</li>
          <li>C. ss06 — Alt G (single-story)</li>
          <li>D. ss06 + ss08 combo</li>
          <li>E. ss04 — Alt R</li>
          <li>F. ss07 — Alt arrows (visible on citations)</li>
          <li>G. Mobile letter-spacing: −0.036em vs −0.025em @ 40px</li>
          <li>H. Mobile citations: superscript+parens vs inline</li>
          <li>I. Mobile line-height: 1.15 vs 1.2 @ 40px</li>
        </ul>
      </header>

      {/* Block A — Baseline */}
      <VariantSection
        id="A"
        name="Status quo — no OpenType features"
        spec='font-feature-settings: "ss08" off'
        note="Reference baseline. Period at end of 'Designer.' sits as a small square."
      >
        <HeroBlock fontFeatureSettings='"ss08" off' />
      </VariantSection>

      {/* Block B — ss08 only */}
      <VariantSection
        id="B"
        name="ss08 — Rounded dot (recommended)"
        spec='font-feature-settings: "ss08" on'
        note="Recommended candidate. Period rounds; subtle warmth across all dots site-wide."
      >
        <HeroBlock fontFeatureSettings='"ss08" on' />
      </VariantSection>

      {/* Block C — ss06 only */}
      <VariantSection
        id="C"
        name="ss06 — Alt G (single-story)"
        spec='font-feature-settings: "ss06" on, "ss08" off'
        note="Switches double-story g → single-story g. Visible in 'Generalist'."
      >
        <HeroBlock fontFeatureSettings='"ss06" on, "ss08" off' />
      </VariantSection>

      {/* Block D — ss06 + ss08 combo */}
      <VariantSection
        id="D"
        name="ss06 + ss08 combo"
        spec='font-feature-settings: "ss06" on, "ss08" on'
        note="Maximum-warmth variant: rounded dot + single-story g together."
      >
        <HeroBlock fontFeatureSettings='"ss06" on, "ss08" on' />
      </VariantSection>

      {/* Block E — ss04 only */}
      <VariantSection
        id="E"
        name="ss04 — Alt R"
        spec='font-feature-settings: "ss04" on, "ss08" off'
        note="No prominent R in hero copy; check by eye on body 'rabbit hole', 'Reprio'."
      >
        <HeroBlock fontFeatureSettings='"ss04" on, "ss08" off' />
      </VariantSection>

      {/* Block F — ss07 only */}
      <VariantSection
        id="F"
        name="ss07 — Alt arrows (visible on citations)"
        spec='font-feature-settings: "ss07" on, "ss08" off'
        note="Refined arrow glyph for the ↗ in CitationLink. Geist Mono carries the visible difference."
      >
        <HeroBlock fontFeatureSettings='"ss07" on, "ss08" off' />
      </VariantSection>

      {/* Block G — Mobile letter-spacing comparison @ 40px display */}
      <VariantSection
        id="G"
        name="Mobile letter-spacing — −0.036em vs −0.025em @ 40px"
        spec="Display rendered at mobile size (40px). Tracking varies."
        note="The applied site change loosens mobile from −0.036em to −0.025em (=−1.0px). Production already updated."
      >
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <p className="type-allcaps text-text-secondary mb-3">G1 · −0.036em (was)</p>
            <ForcedMobileDisplay letterSpacing="-0.036em" lineHeight={1.15} />
          </div>
          <div>
            <p className="type-allcaps text-text-secondary mb-3">G2 · −0.025em (now)</p>
            <ForcedMobileDisplay letterSpacing="-0.025em" lineHeight={1.15} />
          </div>
        </div>
      </VariantSection>

      {/* Block H — Mobile citation register shift */}
      <VariantSection
        id="H"
        name="Mobile citations — superscript+parens vs inline"
        spec="Same lede text rendered with the desktop and mobile citation registers. Containers width-capped to ~360px."
        note="The applied site change drops the superscript register at ≤767px, replacing it with inline body-size colored links. Production already updated."
      >
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-10">
          <div>
            <p className="type-allcaps text-text-secondary mb-3">H1 · Superscript + parens (desktop)</p>
            <div style={{ maxWidth: 360 }}>
              <p className="type-lede text-text-primary">
                <LedeBody />
              </p>
            </div>
          </div>
          <div>
            <p className="type-allcaps text-text-secondary mb-3">H2 · Inline at body size (mobile)</p>
            <div style={{ maxWidth: 360 }}>
              <p className="type-lede text-text-primary">
                <InlineLedeBody />
              </p>
            </div>
          </div>
        </div>
      </VariantSection>

      {/* Block I — Mobile line-height comparison @ 40px display */}
      <VariantSection
        id="I"
        name="Mobile line-height — 1.15 vs 1.2 @ 40px display + byline"
        spec="Display + byline rendered at mobile size (40px). Container width-capped to ~340px to force a 2-line wrap on the headline."
        note="The applied site change opens display + byline from 1.15 to 1.2 on mobile. Production already updated."
      >
        <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1 max-md:gap-10">
          <div>
            <p className="type-allcaps text-text-secondary mb-3">I1 · line-height 1.15 (was)</p>
            <div style={{ maxWidth: 340 }} className="flex flex-col gap-0">
              <ForcedMobileByline lineHeight={1.15} />
              <ForcedMobileDisplay letterSpacing="-0.025em" lineHeight={1.15} />
            </div>
          </div>
          <div>
            <p className="type-allcaps text-text-secondary mb-3">I2 · line-height 1.2 (now)</p>
            <div style={{ maxWidth: 340 }} className="flex flex-col gap-0">
              <ForcedMobileByline lineHeight={1.2} />
              <ForcedMobileDisplay letterSpacing="-0.025em" lineHeight={1.2} />
            </div>
          </div>
        </div>
      </VariantSection>
    </main>
  );
}
