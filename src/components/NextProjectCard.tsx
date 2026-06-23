import { reader } from "@/lib/keystatic";
import { NextProjectSection } from "./NextProjectSection";

interface NextProjectCardProps {
  currentSlug: string;
}

export async function NextProjectCard({ currentSlug }: NextProjectCardProps) {
  const allProjects = await reader.collections.projects.all();
  // Next-project rotation follows the landing's visual order: case studies,
  // then playground, then selected — by `order` within each band. So
  // TeaTime → Reprio → Schneider, matching the page grouping.
  const typeRank = (t?: string) =>
    t === "case-study" ? 0 : t === "playground" ? 1 : 2;
  const sorted = [...allProjects].sort((a, b) => {
    const r = typeRank(a.entry.type) - typeRank(b.entry.type);
    return r !== 0 ? r : (a.entry.order ?? 99) - (b.entry.order ?? 99);
  });

  const currentIdx = sorted.findIndex((p) => p.slug === currentSlug);
  const next = sorted[(currentIdx + 1) % sorted.length];

  if (!next) return null;

  const image =
    typeof next.entry.coverImage === "object" && next.entry.coverImage !== null
      ? (next.entry.coverImage as { src: string }).src
      : (next.entry.coverImage as string) ?? "";

  const entry = next.entry as {
    company?: string;
    tags?: readonly string[];
    title: string;
    description?: string;
  };

  return (
    <NextProjectSection
      company={entry.company || entry.title}
      title={entry.title || entry.description || ""}
      tags={entry.tags ? [...entry.tags] : undefined}
      href={`/${next.slug}`}
      image={image}
      imageAlt={`${entry.title} thumbnail`}
    />
  );
}
