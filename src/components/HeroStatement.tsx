import { StatusTypewriter } from "./StatusTypewriter";

export default function HeroStatement() {
  return (
    <section className="pb-section">
      <div className="max-w-column mx-auto pt-20 max-md:pt-10 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <h1 className="type-display text-text-primary">
            <span className="sr-only">
              Product designer fluent in B2B systems and code.
            </span>
            <span aria-hidden="true">
              <span className="block">Product designer fluent</span>
              <span className="block">in B2B systems &amp; code</span>
            </span>
          </h1>
          <p className="flex items-center">
            <StatusTypewriter />
          </p>
        </div>
      </div>
    </section>
  );
}
