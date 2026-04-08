import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";

export default function Home() {
  return (
    <main className="w-full max-w-frame mx-center">
      <div className="px-content-x">
        <HeroStatement />
      </div>

      {/* Unified single-column feed — cards are full-width, border-y creates the
          implicit double-rule: card border-t is the bottom line, previous card/section
          border-b is the top line, py-section / gap-16 is the blank space between */}
      <div className="flex flex-col gap-16 py-section">
        <CaseStudyCard
          tag="Case Study"
          meta="Skoala · Lead Designer · 2024–25"
          headline="Designing a CMS from scratch"
          highlight="used by 3500+ czech schools"
          primaryHref="/skoala"
          image="/images/skoala/skoala-thumb.png"
          imageAlt="Skoala LMS interface"
        />

        <CaseStudyCard
          tag="Case Study"
          meta="Teatime · Co-owner · 2024–25"
          headline="Redesigning a B2B language school"
          highlight="acquired 12 corporate clients"
          primaryHref="/teatime"
          image="/images/teatime/teatime-thumb.png"
          imageAlt="TeaTime language school interface"
        />

        <CaseStudyCard
          tag="Industrial AI"
          meta="Nnspect · 2022"
          headline="ML training platform for material quality inspection"
          primaryHref="/nnspect"
          image="/images/nnspect/nnspect-thumb.png"
          imageAlt="NNspect inspection platform"
        />

        <CaseStudyCard
          tag="Ecommerce"
          meta="Sakurabook · 2021"
          headline="Shopify plugin for per-hour booking in Japan"
          primaryHref="/sakurabook"
          image="/images/sakurabook/sakurabook-thumb.png"
          imageAlt="Sakurabook booking app"
        />

        <CaseStudyCard
          tag="Fintech"
          meta="Crowdberry · 2020"
          headline="Investment crowdfunding marketplace"
          primaryHref="/crowdberry"
          image="/images/crowdberry/crowdberry-thumb.png"
          imageAlt="Crowdberry investment platform"
        />
      </div>

      {/* Archive section — border-t is the bottom line of the section divider above */}
      <section className="px-content-x pt-section pb-section border-t border-zinc-200 flex flex-col gap-8">
        <h2 className="type-h2 text-text-primary">More Work</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-3/2 bg-zinc-50 border border-zinc-200 rounded-none" />
          ))}
        </div>
      </section>
    </main>
  );
}
