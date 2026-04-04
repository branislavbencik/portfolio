import { TagPill } from "./TagPill";
import { CaptionedImage } from "./CaptionedImage";

export type SelectedProjectProps = {
  metadata: string;
  headline: string;
  description: string;
  tag: string;
  images: Array<{
    src: string;
    alt?: string;
    caption?: string;
    border?: boolean;
    background?: boolean;
    rounded?: boolean;
    width?: number;
  }>;
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
      <div className="mx-center max-w-text">
        <p className="type-body-s text-foreground-secondary">{metadata}</p>
        <h2 className="type-h2 mt-4">{headline}</h2>
        <p className="type-body-m mt-6">{description}</p>
        <div className="mt-4">
          <TagPill>{tag}</TagPill>
        </div>
      </div>
      <div className="mt-15 flex flex-col gap-15">
        {images.map((img) => (
          <CaptionedImage
            key={img.src}
            src={img.src}
            alt={img.alt ?? img.caption ?? ""}
            caption={img.caption}
            {...(img.border !== undefined ? { border: img.border } : {})}
            {...(img.background !== undefined ? { background: img.background } : {})}
            {...(img.rounded !== undefined ? { rounded: img.rounded } : {})}
            {...(img.width !== undefined ? { width: img.width } : {})}
          />
        ))}
      </div>
    </div>
  );
}
