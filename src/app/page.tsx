import { CaseStudyCard } from "@/components/CaseStudyCard";
import { ProjectOverlay } from "@/components/ProjectOverlay";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function Home() {
  return (
    <main className="w-full max-w-frame mx-auto px-content-x">
      {/* ── Case Studies ───────────────────────────────────────── */}
      <section className="py-section">
        <h1 className="font-semibold text-foreground type-h1 mb-section">
          Case studies
        </h1>

        <div className="flex flex-col" style={{ gap: "48px" }}>
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
        </div>
      </section>

      {/* ── Selected Projects ──────────────────────────────────── */}
      <section className="py-section border-t border-border-light">
        <h2 className="font-semibold text-foreground type-h1 mb-section">
          Selected projects
        </h2>

        <div className="grid grid-cols-2" style={{ gap: "12px" }}>
          <ProjectOverlay
            card={{
              image: "/images/nnspect/nnspect-thumb.png",
              imageAlt: "NNspect inspection platform",
              tag: "Industrial AI",
              headline: "ML training platform for material quality inspection",
              meta: "NNSPECT · 2022",
            }}
            content={{
              metadata: "NNSPECT · 2022",
              headline: "ML training platform for material quality inspection",
              description: "A platform concept for nnaisense. The workflow covers the full pipeline from image upload and dataset preparation through model training to accuracy evaluation, spanning operators, ML engineers, and ML scientists",
              tag: "Industrial AI",
              images: [
                {
                  src: "/images/nnspect/nnspect-thumb.png",
                  caption: "Dataset overview with distribution charts, image metadata, and bounding box annotations for defect labeling",
                },
                {
                  src: "/images/nnspect/nnspect-ws1.png",
                  caption: "Live training with validation metrics, epoch-level precision/loss curves, and progress tracking",
                },
                {
                  src: "/images/nnspect/nnspect-ws2.png",
                  caption: "Model evaluation comparing ground-truth annotations against predicted defect labels with detection confidence scores",
                },
              ],
            }}
          />

          {/* TODO: wire up Sakurabook overlay once content is ready */}
          <SelectedProjectCard
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking app"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="SAKURABOOK · 2021"
          />
        </div>
      </section>

      <div className="py-section" />
    </main>
  );
}
