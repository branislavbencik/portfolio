interface MetadataRowProps {
  company: string;
  role?: string;
  year: string;
}

export function MetadataRow({ company, role, year }: MetadataRowProps) {
  const parts = [company, role, year].filter(Boolean);
  return (
    <p className="type-body-s text-text-secondary">
      {parts.join(" · ")}
    </p>
  );
}
