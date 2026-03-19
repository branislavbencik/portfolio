interface MetadataRowProps {
  company: string;
  role?: string;
  year: string;
}

export function MetadataRow({ company, role, year }: MetadataRowProps) {
  const parts = [company, role, year].filter(Boolean);
  return (
    <p className="text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase text-foreground-secondary">
      {parts.join(" · ")}
    </p>
  );
}
