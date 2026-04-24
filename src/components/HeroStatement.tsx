import CitationLink from "./CitationLink";

export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="pt-20 max-md:pt-10 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <p className="type-hero-prose">
            Hi, I&apos;m Branislav – a generalist product designer. I tend to be useful anywhere from re-thinking the learning system
            <CitationLink label="Blueprint" href="/blueprint.pdf" external />, through shipping the automations
            <CitationLink label="n8n" href="https://share-n8n.com/shared/888fkQf1zCAc" external />, prototypes
            <CitationLink label="Schneider" href="https://www.figma.com/proto/YqwEFpw4xULPZhkk8G71rp/Schneider-Electric-%7C-Design-Sprint-Prototype--Copy-?node-id=29236-49394&t=BdNscfgL6llerdQT-1&scaling=min-zoom&content-scaling=fixed&page-id=28260%3A4&starting-point-node-id=29236%3A49394&show-proto-sidebar=1" external />, and code
            <CitationLink label="Sideproject" href="https://reprio.vercel.app/" external />. Sometimes I go all the way down the rabbit hole to map states
            <CitationLink label="Skoala" href="https://www.figma.com/design/ElwxrYVb8YgqCfU1P6aIWE/Skoala-%7C-Teacher-Platform-Beta--Copy-?node-id=15633-97847&t=eetrjMXtBwq4OG2Q-1" external /> and exceptions.
          </p>
        </div>
      </div>
    </section>
  );
}
