"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";
import { ProjectVideo } from "./ProjectVideo";

interface ProjectHeaderProps {
  title: string;
  company?: string;
  year?: string;
  tags?: readonly string[];
  intro?: string;
  heroImage?: string;
  heroImageAlt?: string;
  /** Optional 16:9 MP4. When set, the hero plays it once in-view (no lightbox,
   *  no controls) and `heroImage` is the poster/fallback. */
  heroVideo?: string;
  coverCaption?: string;
}

export function ProjectHeader({
  title,
  company,
  year,
  tags,
  intro,
  heroImage,
  heroImageAlt,
  heroVideo,
  coverCaption,
}: ProjectHeaderProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    // Video heroes are not lightboxed; only register static images.
    if (heroImage && !heroVideo) {
      register({
        id,
        src: heroImage,
        alt: heroImageAlt ?? "",
        background: true,
        paddingSides: "none",
        borderSides: "all",
      });
    }
    return () => unregister(id);
  }, [id, heroImage, heroVideo, heroImageAlt, register, unregister]);

  const kickerValues = [company, year].filter(
    (v): v is string => Boolean(v && v.trim()),
  );
  const tagValues = (tags ?? []).filter((v) => Boolean(v && v.trim()));

  return (
    <section className="w-full pt-detail">
      <div className={`max-lg:px-content-x ${heroImage ? "mb-16 max-md:mb-8" : ""}`}>
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          {kickerValues.length > 0 && (
            <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
              {kickerValues.map((v, i) => (
                <span
                  key={`k-${i}`}
                  className="type-allcaps text-text-secondary whitespace-nowrap"
                >
                  {v}
                  {i < kickerValues.length - 1 && <span aria-hidden="true"> ·</span>}
                </span>
              ))}
            </div>
          )}
          <h1 className="type-page-title text-text-primary">{title}</h1>
          {intro && (
            <p className="type-body text-text-primary mt-3">{intro}</p>
          )}
          {tagValues.length > 0 && (
            <div className="flex items-baseline flex-wrap gap-1.5 mt-3">
              {tagValues.map((t, i) => (
                <span key={`t-${i}`} className="type-tag-chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {heroImage && (
        <figure className="max-lg:px-content-x w-full flex flex-col items-start">
          {heroVideo ? (
            <div className="relative w-full overflow-hidden bg-surface-1 block border border-surface-2 rounded-sm">
              <ProjectVideo
                src={heroVideo}
                poster={heroImage}
                alt={heroImageAlt ?? ""}
                width={1920}
                height={1080}
                hero
                className="w-full h-auto block"
              />
            </div>
          ) : (
            <button
              type="button"
              className="relative w-full overflow-hidden bg-surface-1 cursor-zoom-in block focus-ring-card border border-surface-2 rounded-sm"
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
