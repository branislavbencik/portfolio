interface ImpactItem {
  value: string;
  label: string;
}

interface ImpactBarProps {
  items: ImpactItem[];
}


export function ImpactBar({ items }: ImpactBarProps) {
  return (
    <div className="px-content-x w-full bg-black py-detail">
      <div className="w-full max-w-text mx-center flex items-start gap-16 max-lg:px-8 max-lg:flex-wrap">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-selected-card">
            <span className="type-stat text-white">
              {item.value}
            </span>
            { /* TODO: create inverse color scheme in color config */ }
            <span className="type-body-m !font-medium text-white opacity-70">  
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
