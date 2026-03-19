interface TagPillProps { children: React.ReactNode }

export function TagPill({ children }: TagPillProps) {
  return (
    <span className="inline-block px-1.5 py-0.5 rounded-xs border border-border-light bg-background-alt-2 type-body-s">
      {children}
    </span>
  );
}
