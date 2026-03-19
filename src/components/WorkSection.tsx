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
          <p className="text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase text-foreground-secondary mb-4">
            {label}
          </p>
          <h3 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-foreground mb-4">
            {title}
          </h3>
          <p className="text-[16px] leading-normal text-foreground-secondary">
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
