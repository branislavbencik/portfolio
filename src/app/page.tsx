import { CaseStudyCard } from "@/components/CaseStudyCard";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function Home() {
  return (
    <main className="w-full max-w-frame mx-auto px-content-x">
      {/* ── Case Studies ───────────────────────────────────────── */}
      <section className="pb-section">
        <h1 className="font-semibold text-foreground type-h1 mb-section">
          Case studies
        </h1>

        <div className="flex flex-col gap-case-study">
          <CaseStudyCard
            meta="SKOALA · LEAD DESIGNER · 2024–25"
            headline="Building yet another CMS"
            description="How to allow editors to produce diverse content at scale while keeping zero recurring development cost"
            highlight={<>🏆 Used by <strong>over 50%</strong> of Czech Schools</>}
            primaryHref="/skoala"
            secondaryLabel="View live"
            secondaryHref="https://skoala.cz"
            image="/images/skoala/skoala-thumb.png"
            imageAlt="Skoala LMS interface"
          />

          <hr className="border-0 border-t border-border-light" />

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
      <section className="pb-section">
        <h2 className="font-semibold text-foreground type-h1 mb-section">
          Selected projects
        </h2>

        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
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
        </div>
      </section>
    </main>
  );
}
