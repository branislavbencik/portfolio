import { SelectedProjectContent } from "@/components/SelectedProjectContent";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function NNspectPage() {
  return (
    <>
      <main className="w-full max-w-frame mx-center px-content-x py-detail">
        <SelectedProjectContent
          metadata="NNSPECT · 2022"
          headline="ML training platform for material quality inspection"
          description="A platform concept for nnaisense. The workflow covers the full pipeline from image upload and dataset preparation through model training to accuracy evaluation, spanning operators, ML engineers, and ML scientists"
          tag="Industrial AI"
          images={[
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
          ]}
        />
      </main>

      {/* Next project — double border (two 1px lines, 8px gap) */}
      <div className="w-full flex flex-col gap-2">
        <div className="border-t border-border-light" />
        <div className="border-t border-border-light" />
      </div>
      <div className="w-full max-w-frame mx-center px-content-x py-detail">
        <div className="max-w-text">
          <SelectedProjectCard
            href="/sakurabook"
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking plugin overview"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="SAKURABOOK · 2021"
          />
        </div>
      </div>
    </>
  );
}
