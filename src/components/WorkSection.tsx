interface WorkSectionProps {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function WorkSection({ label, title, description, children }: WorkSectionProps) {
  return (
    <div className="w-full">
      <div className="border-t border-border-light" />

      <section className="w-full max-w-frame mx-auto px-content-x py-section">
        {/* Text header — constrained to 552px reading column */}
        <div className="max-w-text mx-auto w-full mb-section">
          <p className="type-allcaps text-foreground-secondary mb-4">
            {label}
          </p>
          <h3 className="type-h3 text-foreground mb-4">
            {title}
          </h3>
          <p className="type-body-m text-foreground-secondary">
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
