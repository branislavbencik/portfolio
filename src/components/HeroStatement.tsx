export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="max-w-column mx-auto pt-20 max-md:pt-10 pb-10 flex flex-col gap-6 max-md:px-content-x">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <p className="type-allcaps text-text-tertiary flex items-center flex-wrap gap-x-2">
            <span>Senior Product Designer</span>
            <span aria-hidden="true">·</span>
            <span>Prague</span>
            <span aria-hidden="true">·</span>
            <span className="status-dot shrink-0" aria-hidden="true" />
            <span>Open to new roles</span>
          </p>
          <h1 className="type-display text-text-primary">
            I think in systems, design for impact & own the outcome.
          </h1>

          <div className="grid grid-cols-3 max-md:grid-cols-1">
            {[
              { label: "systems", text: "Dependencies, flows, edge cases. I map the whole problem before I open Figma." },
              { label: "impact", text: "I designed platform that teaches financial literacy to every 2nd kid in Czechia." },
              { label: "outcome", text: "Strategy, automation, front-end code, live products. I don't stop at the handoff." },
            ].map((box, i) => (
              <div
                key={box.label}
                className={`animate-hero-box hero-box-delay-${i} hero-box-text-delay-${i} border border-surface-2 ${i > 0 ? "max-md:border-t-0 border-l-0 max-md:border-l" : ""}`}
              >
                <div className="px-6 py-6 max-md:px-4 max-md:py-4 flex flex-col gap-2">
                  <p className="animate-hero-box-text type-allcaps text-text-tertiary">{box.label}</p>
                  <p className="animate-hero-box-text type-body-s text-text-secondary leading-snug">{box.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
