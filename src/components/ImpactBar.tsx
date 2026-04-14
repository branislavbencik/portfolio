interface ImpactItem {
  value: string;
  label: string;
}

interface ImpactBarProps {
  items: ImpactItem[];
}

export function ImpactBar({ items }: ImpactBarProps) {
  return (
    <div className="w-full max-w-frame mx-center px-content-x pb-section">
      <div className="max-w-column mx-auto w-full">
        <div className="flex border border-surface-2 divide-x divide-surface-2 max-md:flex-col max-md:divide-x-0 max-md:divide-y">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-1.5 flex-1 px-8 py-8 max-md:px-4 max-md:py-5"
            >
              <span className="type-stat text-text-primary tabular-nums">
                {item.value}
              </span>
              <span className="type-body-s text-text-secondary">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
