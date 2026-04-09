"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";
import { ProjectTags } from "./ProjectTags";

interface ProjectHeaderProps {
  title: string;
  tags?: string[];
  intro?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export function ProjectHeader({
  title,
  tags,
  intro,
  heroImage,
  heroImageAlt,
}: ProjectHeaderProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    if (heroImage) {
      register({ id, src: heroImage, alt: heroImageAlt ?? "" });
    }
    return () => unregister(id);
  }, [id, heroImage, heroImageAlt, register, unregister]);

  return (
    <section className="w-full py-detail">
      <div className={`px-content-x ${heroImage ? "mb-16" : ""}`}>
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          {tags && tags.length > 0 && <ProjectTags tags={tags} />}
          <h1 className="type-display text-text-primary">{title}</h1>
          {intro && (
            <p className="type-body-l text-text-secondary mt-3">{intro}</p>
          )}
        </div>
      </div>

      {heroImage && (
        <button
          type="button"
          className="relative w-full overflow-hidden border-y border-surface-2 rounded-none bg-background-alt cursor-zoom-in block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
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
      )}
    </section>
  );
}
