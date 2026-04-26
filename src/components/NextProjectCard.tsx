import { reader } from "@/lib/keystatic";
import { NextProjectSection } from "./NextProjectSection";

interface NextProjectCardProps {
  currentSlug: string;
}

export async function NextProjectCard({ currentSlug }: NextProjectCardProps) {
  const allProjects = await reader.collections.projects.all();
  // Playground entries (e.g. Reprio) live only on the landing page and link
  // out to the live product. They have no detail page, so they're excluded
  // from the next-project rotation.
  const sorted = [...allProjects]
    .filter((p) => p.entry.type !== "playground")
    .sort((a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99));

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
