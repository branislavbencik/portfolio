interface ImpactItem {
  value: string;
  label: string;
}

interface ImpactBarProps {
  items: ImpactItem[];
  tight?: boolean;
}

export function ImpactBar({ items, tight }: ImpactBarProps) {
  return (
    <div className={`w-full max-w-frame mx-center max-lg:px-content-x ${tight ? "pt-16" : "pt-section"}`}>
      <div className="max-w-column mx-auto w-full">
        <div className="flex border border-surface-2 rounded-sm max-md:flex-col">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 flex-1 px-8 py-8 max-md:px-4 max-md:py-5 max-md:border-t max-md:border-surface-2 max-md:first:border-t-0"
            >
              <span className="type-stat text-text-primary">
                {item.value}
              </span>
              <span className="type-caption text-text-primary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
