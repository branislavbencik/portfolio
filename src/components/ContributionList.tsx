interface ContributionListProps {
  children: React.ReactNode;
}

export function ContributionList({ children }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-auto px-content-x pb-section">
      <div className="max-w-text mx-auto w-full">
        <h4 className="font-semibold text-foreground type-h4 mb-[24px]">
          My contribution
        </h4>
        <div className="text-[16px] leading-[1.5] text-foreground-secondary">
          {children}
        </div>
      </div>
    </section>
  );
}
