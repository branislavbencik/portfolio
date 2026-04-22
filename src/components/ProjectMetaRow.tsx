interface ProjectMetaRowProps {
  isCaseStudy?: boolean;
  company?: string;
  year?: string;
  role?: string;
}

export function ProjectMetaRow({ isCaseStudy, company, year, role }: ProjectMetaRowProps) {
  const values = [company, year, role].filter((v): v is string => Boolean(v && v.trim()));

  return (
    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
      {isCaseStudy ? (
        <span className="whitespace-nowrap inline-flex items-baseline gap-2">
          <span className="bg-text-primary text-text-inverse/80 type-tag px-2.5 py-1 inline-block">
            Case Study
          </span>
          {values.length > 0 && (
            <span className="type-allcaps text-text-tertiary" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      ) : (
        <span className="whitespace-nowrap inline-flex items-baseline gap-2">
          <span className="type-allcaps text-text-tertiary">Selected project</span>
          {values.length > 0 && (
            <span className="type-allcaps text-text-tertiary" aria-hidden="true">
              ·
            </span>
          )}
        </span>
      )}
      {values.map((v, i) => (
        <span
          key={`v-${i}`}
          className="type-allcaps text-text-tertiary whitespace-nowrap"
        >
          {v}
          {i < values.length - 1 && <span aria-hidden="true"> ·</span>}
        </span>
      ))}
    </div>
  );
}
