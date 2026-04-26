"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";
import { ProjectMetaRow } from "./ProjectMetaRow";

interface ProjectHeaderProps {
  title: string;
  year?: string;
  tags?: readonly string[];
  intro?: string;
  heroImage?: string;
  heroImageAlt?: string;
  coverCaption?: string;
}

export function ProjectHeader({
  title,
  year,
  tags,
  intro,
  heroImage,
  heroImageAlt,
  coverCaption,
}: ProjectHeaderProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    if (heroImage) {
      register({ id, src: heroImage, alt: heroImageAlt ?? "", background: true });
    }
    return () => unregister(id);
  }, [id, heroImage, heroImageAlt, register, unregister]);

  return (
    <section className="w-full pt-detail">
      <div className={`max-lg:px-content-x ${heroImage ? "mb-16 max-md:mb-8" : ""}`}>
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          <ProjectMetaRow
            tags={tags}
            year={year}
          />
          <h1 className="type-page-title text-text-primary">{title}</h1>
          {intro && (
            <p className="type-body text-text-primary mt-3">{intro}</p>
          )}
        </div>
      </div>

      {heroImage && (
        <figure className="max-lg:px-content-x w-full flex flex-col items-start">
          <button
            type="button"
            className="relative w-full overflow-hidden bg-surface-1 cursor-zoom-in block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 border border-surface-2 rounded-sm"
            aria-label="Open hero image in lightbox"
            onClick={() => open(id)}
          >
            <Image
              src={heroImage}
              alt={heroImageAlt ?? ""}
              width={1288}
              height={748}
              className="w-full h-auto block"
              unoptimized
            />
          </button>
          {coverCaption && (
            <figcaption className="w-full max-w-column type-label text-text-secondary text-center self-center mt-3">
              {coverCaption}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}
