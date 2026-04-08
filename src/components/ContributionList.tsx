interface ContributionListProps {
  items: string[];
}

export function ContributionList({ items }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-center px-content-x pb-detail">
      <div className="max-w-text mx-center w-full">
        <h3 className="type-h3 text-foreground mb-4">My contribution</h3>
        <ol className="type-body-m text-foreground-secondary list-decimal pl-[1.25em]">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
