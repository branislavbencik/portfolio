export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="max-w-column mx-auto pt-20 max-md:pt-10 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <h1 className="type-display text-text-primary">
            A bag of things easily forgotten.
          </h1>
          <p className="type-body-l italic text-text-secondary">
            Empty states, 404s, keyboard shortcuts, loading skeletons, offline behavior. The stuff that backfires if you skip it.
          </p>
        </div>
      </div>
    </section>
  );
}
