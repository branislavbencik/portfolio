import { reader } from "@/lib/keystatic";
import { NextProjectSection } from "./NextProjectSection";

interface NextProjectCardProps {
  currentSlug: string;
}

export async function NextProjectCard({ currentSlug }: NextProjectCardProps) {
  const allProjects = await reader.collections.projects.all();
  const sorted = [...allProjects].sort(
    (a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99)
  );

  const currentIdx = sorted.findIndex((p) => p.slug === currentSlug);
  const next = sorted[(currentIdx + 1) % sorted.length];

  if (!next) return null;

  const image =
    typeof next.entry.coverImage === "object" && next.entry.coverImage !== null
      ? (next.entry.coverImage as { src: string }).src
      : (next.entry.coverImage as string) ?? "";

  return (
    <NextProjectSection
      isCaseStudy={next.entry.type === "case-study"}
      year={next.entry.year || undefined}
      role={next.entry.role || undefined}
      domain={(next.entry as { domain?: string }).domain || undefined}
      headline={next.entry.title}
      description={next.entry.description || undefined}
      href={`/${next.slug}`}
      image={image}
      imageAlt={`${next.entry.title} thumbnail`}
    />
  );
}
