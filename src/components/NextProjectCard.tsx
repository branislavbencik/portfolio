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
  if (currentIdx === -1) return null;

  const n = sorted.length;
  if (n <= 1) return null;

  const nextIdx = (currentIdx + 1) % n;
  const prevIdx = (currentIdx - 1 + n) % n;

  const picks = prevIdx === nextIdx
    ? [sorted[nextIdx]]
    : [sorted[nextIdx], sorted[prevIdx]];

  const items = picks.map((p) => {
    const image =
      typeof p.entry.coverImage === "object" && p.entry.coverImage !== null
        ? (p.entry.coverImage as { src: string }).src
        : (p.entry.coverImage as string) ?? "";
    return {
      slug: p.slug,
      isCaseStudy: p.entry.type === "case-study",
      year: p.entry.year || undefined,
      role: p.entry.role || undefined,
      headline: p.entry.title,
      href: `/${p.slug}`,
      image,
      imageAlt: `${p.entry.title} thumbnail`,
    };
  });

  return <NextProjectSection items={items} />;
}
