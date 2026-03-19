interface ImpactItem {
  value: string;
  label: string;
}

interface ImpactBarProps {
  items: ImpactItem[];
}

export function ImpactBar({ items }: ImpactBarProps) {
  return (
    <div className="w-full bg-black py-section">
      <div className="w-full max-w-text mx-auto flex items-start gap-impact">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-selected-card">
            <span className="type-h1 text-white">
              {item.value}
            </span>
            <span className="type-body-s text-foreground-tertiary">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
