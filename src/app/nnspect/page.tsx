import { SelectedProjectContent } from "@/components/SelectedProjectContent";

export default function NNspectPage() {
  return (
    <main className="w-full max-w-frame mx-auto px-content-x py-section">
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
  );
}
