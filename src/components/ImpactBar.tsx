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
      <div className="w-full max-w-text mx-auto flex items-start" style={{ gap: "80px" }}>
        {items.map((item, i) => (
          <div key={i} className="flex flex-col" style={{ gap: "8px" }}>
            <span className="font-semibold text-white type-h1">
              {item.value}
            </span>
            <span className="text-[14px] leading-[1.5] text-grey-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
