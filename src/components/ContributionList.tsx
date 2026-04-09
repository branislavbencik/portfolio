interface ContributionListProps {
  items: string[];
}

export function ContributionList({ items }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-center px-content-x pb-detail">
      <div className="max-w-column mx-auto w-full">
        <h2 className="type-h1 text-text-primary mb-4">My contribution</h2>
        <ol className="type-body-m text-text-secondary list-decimal pl-[1.25em]">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
