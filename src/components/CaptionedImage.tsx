import Image from "next/image";

interface CaptionedImageProps {
  src: string;
  alt: string;
  caption?: string;
  border?: boolean;
  background?: boolean;
  rounded?: boolean;
  width?: number; // max-width in px; defaults to full content width
}

export function CaptionedImage({
  src,
  alt,
  caption,
  border = true,
  background = true,
  rounded = true,
  width,
}: CaptionedImageProps) {
  const wrapperClass = [
    "relative w-full overflow-hidden",
    rounded ? "rounded-md" : "",
    border ? "border border-border-light" : "",
    background ? "bg-background-alt" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className="w-full"
      style={{
        margin: "0",
        ...(width ? { maxWidth: `${width}px`, marginLeft: "auto", marginRight: "auto" } : {}),
      }}
    >
      <div className={wrapperClass}>
        <Image
          src={src}
          alt={alt}
          width={width ?? 1128}
          height={Math.round((width ?? 1128) * (2 / 3))}
          className="w-full h-auto block"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="type-body-s text-foreground-secondary text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
