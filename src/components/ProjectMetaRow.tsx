interface ProjectMetaRowProps {
  tags?: readonly string[];
  year?: string;
}

export function ProjectMetaRow({
  tags,
  year,
}: ProjectMetaRowProps) {
  const tagValues = (tags ?? []).filter((v) => Boolean(v && v.trim()));
  const yearValue = year && year.trim() ? year : undefined;
  const values = [...tagValues, ...(yearValue ? [yearValue] : [])];
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
