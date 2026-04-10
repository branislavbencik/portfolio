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
    <div className="flex items-baseline flex-wrap">
      {isCaseStudy && (
        <span className="bg-text-primary text-text-inverse type-tag font-semibold px-2.5 py-1 inline-block shrink-0">
          Case Study
        </span>
      )}
      {values.map((v, i) => (
        <span key={`v-${i}`} className="flex items-baseline">
          {(isCaseStudy || i > 0) && (
            <span className="type-allcaps text-text-tertiary mx-2" aria-hidden="true">
              ·
            </span>
          )}
          <span className="type-allcaps text-text-tertiary">{v}</span>
        </span>
      ))}
    </div>
  );
}
