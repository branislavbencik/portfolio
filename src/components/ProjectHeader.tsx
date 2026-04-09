"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { useLightbox } from "./LightboxContext";

interface ProjectHeaderProps {
  title: string;
  domainTag?: string;
  role?: string;
  year?: string;
  intro?: string;
  heroImage?: string;
  heroImageAlt?: string;
}

export function ProjectHeader({
  title,
  domainTag,
  role,
  year,
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

  const meta = [domainTag, role, year].filter(Boolean).join(" · ");

  return (
    <section className="w-full py-detail">
      <div className={`px-content-x max-w-text mx-center w-full ${heroImage ? "mb-16" : ""}`}>
        {meta && (
          <p className="type-body-s text-foreground-secondary mb-4">{meta}</p>
        )}
        <h1 className="type-display text-foreground">{title}</h1>
        {intro && (
          <p className="type-body-l text-foreground-secondary mt-6">{intro}</p>
        )}
      </div>

      {heroImage && (
        <div
          className="relative w-full overflow-hidden border-y border-zinc-200 rounded-none bg-background-alt cursor-zoom-in"
          role="button"
          tabIndex={0}
          aria-label="Open hero image in lightbox"
          onClick={() => open(id)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(id); } }}
        >
          <Image
            src={heroImage}
            alt={heroImageAlt ?? ""}
            width={1288}
            height={748}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
      )}
    </section>
  );
}
