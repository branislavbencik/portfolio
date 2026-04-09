interface TagPillProps { children: React.ReactNode }

export function TagPill({ children }: TagPillProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-none border border-surface-2 type-tag text-text-tertiary">
      {children}
    </span>
  );
}
