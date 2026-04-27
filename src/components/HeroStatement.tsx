import CitationLink from "./CitationLink";

export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="pt-32 max-md:pt-16 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
            <h1 className="type-display text-text-primary">Generalist Product Designer.</h1>
          </div>
          <p className="type-lede text-text-primary max-w-lede">
            I tend to be useful anywhere from mapping the learning system
            <CitationLink label="Teatime" href="https://www.figma.com/board/u3gtseQ4wvLMcpNUy4UWWP/Teatime-procesy?node-id=2034-7737" external cursorLabel="System maps — testing, course, accountability" />, through shipping the automations
            <CitationLink label="n8n" href="https://share-n8n.com/shared/888fkQf1zCAc" external cursorLabel="Evaluates English speaking test recordings with AI" />, prototypes
            <CitationLink label="Schneider" href="https://www.figma.com/proto/YqwEFpw4xULPZhkk8G71rp/Schneider-Electric-%7C-Design-Sprint-Prototype?node-id=28343-3731&p=f&t=Au2ICcuaAsHIp6ET-1&scaling=min-zoom&content-scaling=fixed&page-id=28260%3A4&starting-point-node-id=28343%3A3731&show-proto-sidebar=1" external cursorLabel="Made in 1 day during Design Sprint" />, and code
            <CitationLink label="Sideproject" href="https://reprio.vercel.app/" external cursorLabel="Reprio — todo app where an LLM prioritizes" />. Sometimes I go all the way down the rabbit hole to map states
            <CitationLink label="Skoala" href="https://www.figma.com/design/ElwxrYVb8YgqCfU1P6aIWE/Skoala-%7C-Teacher-Platform-Beta--Copy-?node-id=15633-97847&t=eetrjMXtBwq4OG2Q-1" external cursorLabel="100 versions of a presentation slide" /> and exceptions.
          </p>
        </div>
      </div>
    </section>
  );
}
