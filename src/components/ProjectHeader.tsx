"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";
import { ProjectMetaRow } from "./ProjectMetaRow";
import { DeliverablesRow, type Deliverable } from "./DeliverablesRow";

interface ProjectHeaderProps {
  title: string;
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  heroImage?: string;
  heroImageAlt?: string;
  deliverables?: readonly Deliverable[];
}

export function ProjectHeader({
  title,
  isCaseStudy,
  year,
  role,
  heroImage,
  heroImageAlt,
  deliverables,
}: ProjectHeaderProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    if (heroImage) {
      register({ id, src: heroImage, alt: heroImageAlt ?? "" });
    }
    return () => unregister(id);
  }, [id, heroImage, heroImageAlt, register, unregister]);

  const hasDeliverables = (deliverables ?? []).some((d) => d.url && d.url.trim());

  return (
    <section className="w-full py-detail">
      {heroImage && (
        <div className="px-content-x">
          <button
            type="button"
            className="relative w-full max-w-figure mx-auto overflow-hidden rounded-none cursor-zoom-in block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2"
            aria-label="Open hero image in lightbox"
            onClick={() => open(id)}
          >
            <Image
              src={heroImage}
              alt={heroImageAlt ?? ""}
              width={800}
              height={Math.round(800 * (628 / 1080))}
              className="w-full h-auto block"
              unoptimized
            />
          </button>
        </div>
      )}

      {hasDeliverables && (
        <div className={heroImage ? "mt-12 max-md:mt-8" : ""}>
          <DeliverablesRow items={deliverables ?? []} />
        </div>
      )}

      <div className={`px-content-x ${heroImage || hasDeliverables ? "mt-12 max-md:mt-8" : ""}`}>
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          <ProjectMetaRow isCaseStudy={isCaseStudy} year={year} role={role} />
          <h1 className="type-display text-text-primary">{title}</h1>
        </div>
      </div>
    </section>
  );
}
