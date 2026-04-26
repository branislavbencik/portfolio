"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

type PaddingSides = "all" | "no-bottom" | "top-left" | "none";
type BorderSides = "all" | "no-bottom" | "none";

interface CaptionedImageProps {
  src: string;
  alt?: string;
  caption?: string;
  background?: boolean;
  paddingSides?: PaddingSides;
  borderSides?: BorderSides;
  width?: number; // max-width in px; defaults to full content width
}

export function CaptionedImage({
  src,
  alt,
  caption,
  background = true,
  paddingSides,
  borderSides,
  width,
}: CaptionedImageProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    register({ id, src, alt: alt ?? "", caption, background });
    return () => unregister(id);
  }, [id, src, alt, caption, background, register, unregister]);

  const resolvedPadding: PaddingSides = paddingSides ?? (background ? "all" : "none");
  const resolvedBorder: BorderSides = borderSides ?? (background ? "all" : "none");

  const paddingClass =
    resolvedPadding === "all"        ? "p-8 max-md:p-4" :
    resolvedPadding === "no-bottom"  ? "pt-8 px-8 max-md:pt-4 max-md:px-4" :
    resolvedPadding === "top-left"   ? "pt-8 pl-8 max-md:pt-4 max-md:pl-4" :
    "";

  const borderClass =
    resolvedBorder === "all"        ? "border border-surface-2 rounded-sm" :
    resolvedBorder === "no-bottom"  ? "border border-b-0 border-surface-2 rounded-t-sm" :
    "";

  const wrapperClass = [
    "relative w-full overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2",
    background ? "bg-surface-1" : "",
    paddingClass,
    borderClass,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={`w-full flex flex-col items-start ${width ? "mx-auto" : ""}`}
      style={width ? { maxWidth: `${width}px` } : undefined}
    >
      <button
        type="button"
        className={wrapperClass}
        aria-label={alt ? `Open image in lightbox: ${alt}` : "Open image in lightbox"}
        onClick={() => open(id)}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          width={width ?? 1128}
          height={Math.round((width ?? 1128) * (2 / 3))}
          className="w-full h-auto block relative"
          unoptimized
        />
      </button>
      {caption && (
        <figcaption className="w-full max-w-column type-caption text-text-secondary text-center self-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
