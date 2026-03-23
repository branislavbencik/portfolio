interface ContributionListProps {
  children: React.ReactNode;
}

export function ContributionList({ children }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-center px-content-x pb-detail">
      <div className="max-w-text mx-center w-full">
        <h2 className="type-h2 text-foreground mb-4">
          My contribution
        </h2>
        <div className="type-body-m text-foreground-secondary">
          {children}
        </div>
      </div>
    </section>
  );
}
