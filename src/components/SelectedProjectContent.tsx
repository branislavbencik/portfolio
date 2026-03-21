import { TagPill } from "./TagPill";
import { CaptionedImage } from "./CaptionedImage";

export type SelectedProjectProps = {
  metadata: string;
  headline: string;
  description: string;
  tag: string;
  images: Array<{ src: string; alt?: string; caption?: string }>;
};

export function SelectedProjectContent({
  metadata,
  headline,
  description,
  tag,
  images,
}: SelectedProjectProps) {
  return (
    <div>
      <div className="mx-auto" style={{ maxWidth: "552px" }}>
        <p className="type-allcaps text-foreground-secondary">{metadata}</p>
        <h2 className="type-h2 mt-4">{headline}</h2>
        <p className="type-body-l mt-6">{description}</p>
        <div className="mt-4">
          <TagPill>{tag}</TagPill>
        </div>
      </div>
      <div className="mt-[60px] flex flex-col gap-[60px]">
        {images.map((img) => (
          <CaptionedImage
            key={img.src}
            src={img.src}
            alt={img.alt ?? img.caption ?? ""}
            caption={img.caption}
          />
        ))}
      </div>
    </div>
  );
}
