import CitationLink from "./CitationLink";
import HoverPreview from "./HoverPreview";

export default function HeroStatement() {
  return (
    <section className="pb-section thumb-280 card-style-casestudy shadow-on">
      <HoverPreview />
      <div className="pt-32 max-md:pt-16 pb-10 flex flex-col gap-6">
        <div className="animate-hero-content-in flex flex-col gap-6">
          <div className="flex flex-col gap-0">
            <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
            <h1 className="type-display text-text-primary">Generalist Product Designer.</h1>
          </div>
          <p className="type-lede text-text-primary max-w-lede">
            I tend to be useful anywhere from mapping{" "}
            <CitationLink
              label="systems"
              href="https://www.figma.com/board/u3gtseQ4wvLMcpNUy4UWWP/Teatime-procesy?node-id=2034-7737"
              external
              previewSrc="/images/hero-previews/service-design.png"
              previewCaption="Service design of the learning system"
            />, through shipping{" "}
            <CitationLink
              label="automations"
              href="https://share-n8n.com/shared/888fkQf1zCAc"
              external
              previewSrc="/images/hero-previews/n8n.png"
              previewCaption="n8n workflow for speech evaluation"
            />,{" "}
            <CitationLink
              label="prototypes"
              href=""
              disabled
              lockedPreviewSrc="/images/hero-previews/schneider.png"
              lockedPreviewCaption="Schneider Electric configurator"
            />, and{" "}
            <CitationLink
              label="code"
              href="https://reprio.vercel.app/"
              external
              previewSrc="/images/hero-previews/reprio.png"
              previewCaption="Chat with AI to prioritize tasks"
            />. I focus on the path of maximum leverage in heavy tradeoffs.
          </p>
        </div>
      </div>
    </section>
  );
}
