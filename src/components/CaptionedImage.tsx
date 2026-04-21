"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

interface CaptionedImageProps {
  src: string;
  alt?: string;
  caption?: string;
}

export function CaptionedImage({ src, alt, caption }: CaptionedImageProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    register({ id, src, alt: alt ?? "", caption });
    return () => unregister(id);
  }, [id, src, alt, caption, register, unregister]);

  return (
    <figure className="w-full max-w-column mx-auto flex flex-col items-center">
      <button
        type="button"
        className="relative w-full overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
        aria-label={alt ? `Open image in lightbox: ${alt}` : "Open image in lightbox"}
        onClick={() => open(id)}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          width={640}
          height={Math.round(640 * (2 / 3))}
          className="w-full h-auto block relative"
          unoptimized
        />
      </button>
      {caption && (
        <figcaption className="w-3/4 max-lg:w-full type-body-s text-text-secondary text-center max-lg:text-left mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
