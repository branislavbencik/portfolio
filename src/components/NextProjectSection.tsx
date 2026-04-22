import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectItem {
  slug: string;
  isCaseStudy?: boolean;
  company?: string;
  year?: string;
  role?: string;
  headline: string;
  tags?: readonly string[];
  href: string;
  image: string;
  imageAlt: string;
}

interface NextProjectSectionProps {
  items: NextProjectItem[];
}

export function NextProjectSection({ items }: NextProjectSectionProps) {
  if (items.length === 0) return null;
  return (
    <div className="w-full max-w-frame mx-center px-content-x">
      <div className="border-t border-surface-2 pt-section">
        <p className="type-allcaps text-text-secondary mb-section">More work</p>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
          {items.map((item) => (
            <CaseStudyCard
              key={item.slug}
              isCaseStudy={item.isCaseStudy}
              company={item.company}
              year={item.year}
              role={item.role}
              headline={item.headline}
              tags={item.tags}
              primaryHref={item.href}
              image={item.image}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
