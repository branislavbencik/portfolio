import { CaseStudyCard } from "@/components/CaseStudyCard";
import SelectedProjectCard from "@/components/SelectedProjectCard";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <main className="w-full max-w-frame mx-center px-content-x">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <HeroCarousel />
      {/* ── Case Studies ───────────────────────────────────────── */}
      <section className="my-section">
        <h1 className="text-foreground type-h5 pb-8">
          Case studies
        </h1>

        <div className="flex flex-col gap-case-study">
          <hr className="border-0 border-t border-border-light max-lg:hidden" />

          <CaseStudyCard
            meta="SKOALA · LEAD DESIGNER · 2024–25"
            headline="Designing a CMS from scratch"
            description="How to allow editors to produce diverse content at scale while keeping zero recurring development cost"
            highlight={<>🏆 Used by <strong>over 50%</strong> of Czech schools</>}
            primaryHref="/skoala"
            secondaryLabel="View website"
            secondaryHref="https://skoala.cz"
            image="/images/skoala/skoala-thumb.png"
            imageAlt="Skoala LMS interface"
          />

          <hr className="border-0 border-t border-border-light max-lg:hidden" />

          <CaseStudyCard
            meta="TEATIME · CO-OWNER · 2024–25"
            headline="Redesigning a B2B language school"
            description="How to give every student a different curriculum and still get comparable progress data"
            highlight={<>🏆 Acquired <strong>12</strong> corporate clients</>}
            primaryHref="/teatime"
            secondaryLabel="View website"
            secondaryHref="https://teatime.cz"
            image="/images/teatime/teatime-thumb.png"
            imageAlt="TeaTime language school interface"
          />
          <hr className="border-0 border-t border-border-light" />
        </div>
      </section>

      {/* ── Selected Projects ──────────────────────────────────── */}
      <section className="my-section">
        <h2 className="text-foreground type-h5 pb-8">
          Selected projects
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 max-lg:gap-16 max-lg:grid-cols-1">
          <SelectedProjectCard
            href="/nnspect"
            image="/images/nnspect/nnspect-thumb.png"
            imageAlt="NNspect inspection platform"
            tag="Industrial AI"
            headline="ML training platform for material quality inspection"
            meta="NNSPECT · 2022"
          />

          <SelectedProjectCard
            href="/sakurabook"
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking app"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="SAKURABOOK · 2021"
          />

          <SelectedProjectCard
            href="/crowdberry"
            image="/images/crowdberry/crowdberry-thumb.png"
            imageAlt="Crowdberry investment platform"
            tag="Fintech"
            headline="Investment crowdfunding marketplace"
            meta="CROWDBERRY · 2020"
          />
        </div>
      </section>
    </main>
  );
}
