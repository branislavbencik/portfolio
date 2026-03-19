interface ContributionListProps {
  children: React.ReactNode;
}

export function ContributionList({ children }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-auto px-content-x pb-section">
      <div className="max-w-text mx-auto w-full">
        <h4 className="type-h4 text-foreground mb-6">
          My contribution
        </h4>
        <div className="type-body-m text-foreground-secondary">
          {children}
        </div>
      </div>
    </section>
  );
}
