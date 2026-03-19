interface MetadataRowProps {
  company: string;
  role?: string;
  year: string;
}

export function MetadataRow({ company, role, year }: MetadataRowProps) {
  const parts = [company, role, year].filter(Boolean);
  return (
    <p className="type-allcaps text-foreground-secondary">
      {parts.join(" · ")}
    </p>
  );
}
