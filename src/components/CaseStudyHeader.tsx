"use client";

import { useId, useEffect } from "react";
import Image from "next/image";
import { MetadataRow } from "./MetadataRow";
import { useLightbox } from "./LightboxContext";

interface CaseStudyHeaderProps {
  company: string;
  role?: string;
  year: string;
  headline: string;
  heroImage?: string;
  heroImageAlt?: string;
  children: React.ReactNode;
}

export function CaseStudyHeader({
  company,
  role,
  year,
  headline,
  heroImage,
  heroImageAlt,
  children,
}: CaseStudyHeaderProps) {
  const id = useId();
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    if (heroImage) {
      register({ id, src: heroImage, alt: heroImageAlt ?? "" });
    }
    return () => unregister(id);
  }, [id, heroImage, heroImageAlt, register, unregister]);

  return (
    <section className="w-full max-w-frame mx-center px-content-x py-detail">
      {/* Text block — centered reading column */}
      <div className={`max-w-text mx-center w-full ${heroImage ? "mb-16" : ""}`}>
        <MetadataRow company={company} role={role} year={year} />
        <h1 className="type-h2 text-foreground my-4 max-w-94">
          {headline}
        </h1>
        <div className="type-l text-foreground-secondary">
          {children}
        </div>
      </div>

      {/* Hero image — full content width */}
      {heroImage && (
        <div
          className="relative w-full overflow-hidden rounded-md shadow-border bg-background-alt cursor-zoom-in"
          onClick={() => open(id)}
        >
          <Image
            src={heroImage}
            alt={heroImageAlt ?? ""}
            width={1128}
            height={752}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
      )}
    </section>
  );
}
