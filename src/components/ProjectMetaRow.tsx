interface ProjectMetaRowProps {
  year?: string;
  role?: string;
  domain?: string;
}

export function ProjectMetaRow({
  year,
  role,
  domain,
}: ProjectMetaRowProps) {
  const values = [year, role, domain].filter((v): v is string => Boolean(v && v.trim()));
  if (values.length === 0) return null;

  return (
    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
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
