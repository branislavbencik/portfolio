import Image from "next/image";

export interface AwardItem {
  logo?: string;
  name: string;
  description?: string;
}

interface AwardListProps {
  items: AwardItem[];
}

export function AwardList({ items }: AwardListProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-column mx-auto flex flex-col gap-3">
      {items.map((award, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-6 py-4 max-md:px-4 border border-surface-2 rounded-sm"
        >
          {award.logo && (
            <Image
              src={award.logo}
              alt={award.name}
              width={48}
              height={48}
              className="h-12 w-12 max-md:h-10 max-md:w-10 object-contain shrink-0"
              unoptimized
            />
          )}
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="type-label text-text-primary">{award.name}</span>
            {award.description && (
              <span className="type-caption text-text-secondary">
                {award.description}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
