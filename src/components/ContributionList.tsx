interface ContributionListProps {
  items: string[];
}

export function ContributionList({ items }: ContributionListProps) {
  return (
    <section className="w-full max-w-frame mx-center max-lg:px-content-x pt-section">
      <div className="max-w-column mx-auto w-full">
        <h2 className="type-heading text-text-primary mb-4">My contribution</h2>
        <ol className="type-body text-text-primary list-decimal pl-[1.25em]">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
