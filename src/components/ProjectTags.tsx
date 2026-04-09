import React from "react";

interface ProjectTagsProps {
  tags: string[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  const hasCaseStudy = tags.some((t) => t.toUpperCase() === "CASE STUDY");
  const others = tags.filter((t) => t.toUpperCase() !== "CASE STUDY");

  if (!tags.length) return null;

  const allParts: React.ReactNode[] = [];

  if (hasCaseStudy) {
    allParts.push(
      <span
        key="case-study"
        className="bg-surface-2 text-text-primary type-tag font-semibold px-2.5 py-1 inline-block shrink-0"
      >
        Case Study
      </span>
    );
  }

  others.forEach((tag, i) => {
    allParts.push(
      <span key={`sep-${i}`} className="type-allcaps text-text-tertiary mx-2" aria-hidden="true">
        ·
      </span>
    );
    allParts.push(
      <span key={`tag-${i}`} className="type-allcaps text-text-tertiary">
        {tag}
      </span>
    );
  });

  // If no case study tag, remove the leading separator
  const parts = hasCaseStudy ? allParts : allParts.slice(1);

  return <div className="flex items-baseline flex-wrap">{parts}</div>;
}
