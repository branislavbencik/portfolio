import CitationLink from "./CitationLink";

export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="pt-20 max-md:pt-10 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <p className="type-hero-prose">
            Hi, I&apos;m Branislav — a generalist product designer. I happen
            to be useful anywhere from re-thinking the learning system
            <CitationLink label="Blueprint" href="#" />, through shipping
            the automations<CitationLink label="n8n" href="#" />, prototypes
            <CitationLink label="Schneider" href="#" />, and code
            <CitationLink label="Reprio" href="#" external />, all the way
            down the rabbit hole to the states and exceptions
            <CitationLink label="Skoala" href="#" />
          </p>
          <p className="type-kicker">
            Previously @Applifting · Co-founded TeaTime
          </p>
        </div>
      </div>
    </section>
  );
}
