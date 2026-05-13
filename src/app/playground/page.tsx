import CitationLink from "@/components/CitationLink";

const PRD_HREF =
  "https://clever-statistic-860.notion.site/PRD-Personalized-English-Learning-System-34ee84d8cf3f808cbff3d01f55d39e49?pvs=73";
const N8N_HREF = "https://share-n8n.com/shared/888fkQf1zCAc";
const SIDEPROJECT_HREF = "https://reprio.vercel.app/";
const SKOALA_HREF =
  "https://www.figma.com/design/ElwxrYVb8YgqCfU1P6aIWE/Skoala-%7C-Teacher-Platform-Beta--Copy-?node-id=15633-97847&t=eetrjMXtBwq4OG2Q-1";

function LedeBody() {
  return (
    <>
      I tend to be useful anywhere from re-thinking the learning system
      <CitationLink label="PRD" href={PRD_HREF} external />, through shipping the automations
      <CitationLink label="n8n" href={N8N_HREF} external />, prototypes, and code
      <CitationLink label="Sideproject" href={SIDEPROJECT_HREF} external />. Sometimes I go all the way down the rabbit hole to map states
      <CitationLink label="Skoala" href={SKOALA_HREF} external /> and exceptions.
    </>
  );
}

function SingleParagraphBody() {
  return (
    <>
      Hi, I&apos;m Branislav – a generalist product designer. I tend to be useful anywhere from re-thinking the learning system
      <CitationLink label="PRD" href={PRD_HREF} external />, through shipping the automations
      <CitationLink label="n8n" href={N8N_HREF} external />, prototypes, and code
      <CitationLink label="Sideproject" href={SIDEPROJECT_HREF} external />. Sometimes I go all the way down the rabbit hole to map states
      <CitationLink label="Skoala" href={SKOALA_HREF} external /> and exceptions.
    </>
  );
}

function EVariantBody() {
  return (
    <>
      Hi, I&apos;m Branislav. I tend to be useful anywhere from re-thinking the learning system
      <CitationLink label="PRD" href={PRD_HREF} external />, through shipping the automations
      <CitationLink label="n8n" href={N8N_HREF} external />, prototypes, and code
      <CitationLink label="Sideproject" href={SIDEPROJECT_HREF} external />. Sometimes I go all the way down the rabbit hole to map states
      <CitationLink label="Skoala" href={SKOALA_HREF} external /> and exceptions.
    </>
  );
}

interface VariantSectionProps {
  id: string;
  name: string;
  spec: string;
  caveat?: string;
  children: React.ReactNode;
}

function VariantSection({ id, name, spec, caveat, children }: VariantSectionProps) {
  return (
    <section className="border-b border-surface-2">
      <div className="max-w-frame mx-center max-lg:px-content-x py-section">
        <header className="mb-12 max-w-column">
          <p className="type-allcaps text-text-secondary mb-2">Variant {id}</p>
          <h2 className="type-subheading text-text-primary mb-2">{name}</h2>
          <p className="type-caption text-text-secondary font-mono">{spec}</p>
          {caveat && (
            <p className="type-caption text-text-secondary mt-2 italic">⚠ {caveat}</p>
          )}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function PlaygroundPage() {
  return (
    <main>
      {/* Page intro */}
      <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-secondary mb-3">Design lab</p>
        <h1 className="type-heading text-text-primary mb-4">Hero variants</h1>
        <p className="type-body text-text-secondary max-w-column">
          Seven typographic treatments of the landing-page hero, after pruning rejected variants.
          Live candidates: B, B-Light, B-Light-2 (the &quot;serif byline + sans display&quot; family). Reference variants kept for contrast: A (no headline), E / E2 (serif lede experiments), H (em-dash with hierarchy).
        </p>
      </header>

      {/* Variant A — Status quo single paragraph (kept for contrast: "no head" extreme) */}
      <VariantSection
        id="A"
        name="Single paragraph (status quo on main)"
        spec="Geist Sans 28 / 400 / 1.4 · em-dash narrative · 1 register"
        caveat='Kept for reference. User notes: "no head, just body — might piss off readers obliged to read it all."'
      >
        <p className="text-text-primary text-[28px] font-normal leading-[1.4] max-w-[920px]">
          <SingleParagraphBody />
        </p>
      </VariantSection>

      {/* Variant B — Mixed masthead, Banner Regular byline (current localhost / production direction) */}
      <VariantSection
        id="B"
        name="Mixed masthead — Banner REGULAR byline + Geist Bold display + Geist Regular lede"
        spec="VC Honey Banner Regular 400 56 byline · Geist Bold 56 display · Geist Regular 400 20 lede · max-w 842"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p className="type-lede text-text-primary max-w-lede">
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant B-Light — Banner Light byline, Geist Regular lede */}
      <VariantSection
        id="B-Light"
        name="Mixed masthead — Banner LIGHT byline + Geist Bold display + Geist Regular lede"
        spec="VC Honey Banner Light 300 56 byline · Geist Bold 56 display · Geist Regular 400 20 lede · max-w 842"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-vc-honey), Georgia, serif",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I&apos;m Branislav,
            </p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p className="type-lede text-text-primary max-w-lede">
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant B-Light-2 — Banner Light byline + Geist LIGHT lede (proportionality test) */}
      <VariantSection
        id="B-Light-2"
        name="Mixed masthead — Banner LIGHT byline + Geist Bold display + Geist LIGHT lede"
        spec="VC Honey Banner Light 300 56 byline · Geist Bold 56 display · Geist Light 300 20 lede · max-w 842 · paired-light experiment"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-vc-honey), Georgia, serif",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I&apos;m Branislav,
            </p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p
            className="type-lede text-text-primary max-w-lede"
            style={{ fontWeight: 300 }}
          >
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant B-Light-3 — Banner Light byline + Geist MID-WEIGHT 350 lede (variable axis splits 300/400) */}
      <VariantSection
        id="B-Light-3"
        name="Mixed masthead — Banner LIGHT byline + Geist Bold display + Geist 350 lede (variable mid-weight)"
        spec="VC Honey Banner Light 300 56 byline · Geist Bold 56 display · Geist 350 / 20 lede · max-w 842 · variable-axis mid-weight experiment"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-vc-honey), Georgia, serif",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I&apos;m Branislav,
            </p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p
            className="type-lede text-text-primary max-w-lede"
            style={{ fontWeight: 350 }}
          >
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant B-Light-Spaced — same as B-Light-2 but with positive letter-spacing on lede to compensate for thin strokes */}
      <VariantSection
        id="B-Light-Spaced"
        name="Mixed masthead — Banner LIGHT byline + Geist Bold display + Geist LIGHT lede with +0.01em tracking"
        spec="VC Honey Banner Light 300 56 byline · Geist Bold 56 display · Geist Light 300 / 20 / +0.01em tracking lede · max-w 842"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-vc-honey), Georgia, serif",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I&apos;m Branislav,
            </p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p
            className="type-lede text-text-primary max-w-lede"
            style={{ fontWeight: 300, letterSpacing: "0.01em" }}
          >
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant E — Inverted (sans display + serif lede) — kept for contrast: "serif body" extreme */}
      <VariantSection
        id="E"
        name="Inverted — sans display + serif lede"
        spec="Geist Bold 56 display · VC Honey Deck Regular 24 lede · max-w 720 · 'Hi, I'm Branislav' folds into lede · 2 registers"
        caveat='Kept for reference. User: "Hi I&apos;m Branislav in the middle interrupts the chain between role claim and explanation." Chain-break problem.'
      >
        <div className="flex flex-col gap-8">
          <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          <p
            className="text-text-primary max-w-[720px]"
            style={{
              fontFamily: "var(--font-vc-honey-deck), Georgia, serif",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.45,
            }}
          >
            <EVariantBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant E2 — Three-tier essayist (kept for contrast: "two serif tiers" extreme) */}
      <VariantSection
        id="E2"
        name="Three-tier essayist — serif byline + sans display + serif lede"
        spec="Banner Light 56 byline · Geist Bold 56 display · Deck Regular 24 lede · max-w 720 · 3 registers, serif bookends sans"
        caveat='Kept for reference. User: "becomes crowded — variable headline font with variable weight, serif body, and links with mono. Too many stylistic moves."'
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-vc-honey), Georgia, serif",
                fontSize: 56,
                fontWeight: 300,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              Hi, I&apos;m Branislav,
            </p>
            <h3 className="type-display text-text-primary">Technical Product Designer.</h3>
          </div>
          <p
            className="text-text-primary max-w-[720px]"
            style={{
              fontFamily: "var(--font-vc-honey-deck), Georgia, serif",
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.45,
            }}
          >
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Variant H — Em-dash + one hierarchy step (kept for contrast: "no serif" extreme) */}
      <VariantSection
        id="H"
        name="Em-dash narrative WITH one hierarchy step"
        spec="Geist 36 / 600 / -0.02em lead sentence · Geist 22 / 1.45 lede · no serif · 2 registers"
        caveat='Kept for reference. User: "little generic, with fancy links not that bad. Bad part is sans name."'
      >
        <div className="flex flex-col gap-6">
          <p className="text-text-primary text-[36px] font-semibold leading-[1.2] tracking-[-0.02em] max-w-[920px]">
            Hi, I&apos;m Branislav — a generalist product designer.
          </p>
          <p className="text-text-primary text-[22px] font-normal leading-[1.45] max-w-[760px]">
            <LedeBody />
          </p>
        </div>
      </VariantSection>

      {/* Footer — convergence summary */}
      <section className="border-b border-surface-2">
        <div className="max-w-frame mx-center max-lg:px-content-x py-section">
          <header className="mb-8 max-w-column">
            <p className="type-allcaps text-text-secondary mb-2">Convergence</p>
            <h2 className="type-subheading text-text-primary mb-2">Decision: pick from B / B-Light / B-Light-2</h2>
            <p className="type-caption text-text-secondary">
              All three share the same head-up-body-down anatomy: serif byline + sans bold display + sans lede + mono citations.
              The only differences are byline weight (Banner Regular 400 vs Light 300) and lede weight (Geist Regular 400 vs Light 300).
            </p>
          </header>
          <table className="type-caption text-text-primary border-collapse">
            <thead>
              <tr className="border-b border-surface-2">
                <th className="text-left py-2 pr-6">Variant</th>
                <th className="text-left py-2 pr-6">Byline</th>
                <th className="text-left py-2 pr-6">Lede</th>
                <th className="text-left py-2 pr-6">Reads as</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-b border-surface-2"><td className="py-2 pr-6">B</td><td className="py-2 pr-6">Banner Regular 400</td><td className="py-2 pr-6">Geist Regular 400</td><td className="py-2 pr-6">Neutral, balanced. Stated greeting + technical body.</td></tr>
              <tr className="border-b border-surface-2"><td className="py-2 pr-6">B-Light</td><td className="py-2 pr-6">Banner Light 300</td><td className="py-2 pr-6">Geist Regular 400</td><td className="py-2 pr-6">Intimate greeting + technical body. More confident headline split.</td></tr>
              <tr><td className="py-2 pr-6">B-Light-2</td><td className="py-2 pr-6">Banner Light 300</td><td className="py-2 pr-6">Geist Light 300</td><td className="py-2 pr-6">Paired-light: airy greeting + airy body. Most refined; risk of feeling too thin.</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
