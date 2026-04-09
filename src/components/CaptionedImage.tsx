"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

interface CaptionedImageProps {
  src: string;
  alt?: string;
  caption?: string;
  background?: boolean;
  padding?: boolean;
  bleedBottom?: boolean;
  width?: number; // max-width in px; defaults to full content width
}

export function CaptionedImage({
  src,
  alt,
  caption,
  background = true,
  padding = true,
  bleedBottom = false,
  width,
}: CaptionedImageProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    register({ id, src, alt: alt ?? "", caption });
    return () => unregister(id);
  }, [id, src, alt, caption, register, unregister]);

  const wrapperClass = [
    "relative w-full overflow-hidden cursor-zoom-in",
    background ? "bg-zinc-100" : "",
    padding ? "p-8" : "",
    background ? (bleedBottom ? "border border-b-0 border-zinc-200" : "border border-zinc-200") : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure
      className={`w-full flex flex-col items-center ${width ? "mx-center" : ""}`}
      style={width ? { maxWidth: `${width}px` } : undefined}
    >
      <div
        className={wrapperClass}
        role="button"
        tabIndex={0}
        aria-label="Open image in lightbox"
        onClick={() => open(id)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(id); } }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          width={width ?? 1128}
          height={Math.round((width ?? 1128) * (2 / 3))}
          className="w-full h-auto block relative"
          unoptimized
        />
      </div>
      {caption && (
        <figcaption className="w-3/4 max-lg:w-full type-body-s text-foreground-secondary text-center max-lg:text-left mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
