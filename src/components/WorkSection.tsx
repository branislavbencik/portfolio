interface WorkSectionProps {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function WorkSection({ id, label, title, description, children }: WorkSectionProps) {
  return (
    <div id={id} className="w-full">
      <section className="w-full max-w-frame mx-center max-lg:px-content-x pt-section">
        {/* Text header — constrained to column width */}
        <div className="max-w-column mx-auto w-full mb-detail">
          <p className="type-allcaps text-text-secondary mb-3">
            {label}
          </p>
          <h2 className="type-heading text-text-primary mb-5">
            {title}
          </h2>
          <p className="type-body text-text-primary">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {children}
        </div>
      </section>
    </div>
  );
}
