interface ProjectMetaRowProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  domain?: string;
}

export function ProjectMetaRow({
  isCaseStudy,
  year,
  role,
  domain,
}: ProjectMetaRowProps) {
  const values = [year, role, domain].filter((v): v is string => Boolean(v && v.trim()));
  if (!isCaseStudy && values.length === 0) return null;

  return (
    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
      {isCaseStudy && (
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
