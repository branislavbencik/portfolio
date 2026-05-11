"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

export type PaddingSides = "all" | "no-bottom" | "top-left" | "none";
export type BorderSides = "all" | "no-bottom" | "none";
export type CornerRadius = "sm" | "md";
export type BackgroundShade = "1" | "white";

export interface FramingOpts {
  background?: boolean;
  backgroundShade?: BackgroundShade;
  paddingSides?: PaddingSides;
  borderSides?: BorderSides;
  cornerRadius?: CornerRadius;
}

// Shared between body (CaptionedImage) and lightbox so the two render paths
// can never drift. Lightbox parity is a locked rule — see
// feedback_lightbox_mirrors_detail_one_to_one in memory.
export function framingClass(opts: FramingOpts): string {
  const background = opts.background ?? true;
  const backgroundShade: BackgroundShade = opts.backgroundShade ?? "1";
  const resolvedPadding: PaddingSides = opts.paddingSides ?? (background ? "all" : "none");
  const resolvedBorder: BorderSides = opts.borderSides ?? (background ? "all" : "none");

  const paddingClass =
    resolvedPadding === "all"        ? "p-8 max-md:p-4" :
    resolvedPadding === "no-bottom"  ? "pt-8 px-8 max-md:pt-4 max-md:px-4" :
    resolvedPadding === "top-left"   ? "pt-8 pl-8 max-md:pt-4 max-md:pl-4" :
    "";

  const borderClass =
    resolvedBorder === "all"        ? "border border-surface-2 rounded-sm" :
    resolvedBorder === "no-bottom"  ? "border border-b-0 border-surface-2 rounded-t-sm" :
    "";

  const cornerRadiusClass =
    resolvedBorder === "none" && opts.cornerRadius === "sm" ? "rounded-sm" :
    resolvedBorder === "none" && opts.cornerRadius === "md" ? "rounded-md" :
    "";

  return [
    background ? (backgroundShade === "white" ? "bg-surface-tile" : "bg-surface-1") : "",
    paddingClass,
    borderClass,
    cornerRadiusClass,
  ]
    .filter(Boolean)
    .join(" ");
}

interface CaptionedImageProps extends FramingOpts {
  src: string;
  alt?: string;
  caption?: string;
  width?: number; // max-width in px; defaults to full content width
}

export function CaptionedImage({
  src,
  alt,
  caption,
  background = true,
  backgroundShade = "1",
  paddingSides,
  borderSides,
  cornerRadius,
  width,
}: CaptionedImageProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    register({
      id,
      src,
      alt: alt ?? "",
      caption,
      background,
      backgroundShade,
      paddingSides,
      borderSides,
      cornerRadius,
    });
    return () => unregister(id);
  }, [
    id,
    src,
    alt,
    caption,
    background,
    backgroundShade,
    paddingSides,
    borderSides,
    cornerRadius,
    register,
    unregister,
  ]);

  const wrapperClass = [
    "relative w-full overflow-hidden cursor-zoom-in focus-ring-card",
    framingClass({ background, backgroundShade, paddingSides, borderSides, cornerRadius }),
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
        <figcaption className="w-full max-w-column type-label text-text-secondary text-center self-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
