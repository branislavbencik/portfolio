interface WorkSectionProps {
  id?: string;
  label?: string;
  title: string;
  description?: string;
  isLast?: boolean;
  children: React.ReactNode;
}

export function WorkSection({ id, label, title, description, isLast, children }: WorkSectionProps) {
  return (
    <div id={id} className={`w-full${isLast ? "" : " border-b border-surface-2"}`}>
      <section className="w-full max-w-frame mx-center px-content-x py-section">
        {/* Text header — constrained to column width */}
        <div className="max-w-column mx-auto w-full mb-12">
          <p className="type-allcaps text-text-secondary mb-4">
            {label}
          </p>
          <h2 className="type-section-h2 text-text-primary mb-4">
            {title}
          </h2>
          <p className="type-body-l text-text-secondary">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-section">
          {children}
        </div>
      </section>
    </div>
  );
}
