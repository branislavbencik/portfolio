import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  tag?: string;
  type?: "case-study" | "selected";
  headline: string;
  description?: string;
  metric?: string;
  href: string;
  image: string;
  imageAlt: string;
  // Legacy props for MDX inline usage
  meta?: string;
  highlight?: string;
}

export function NextProjectSection({
  tag,
  type,
  headline,
  description,
  metric,
  href,
  image,
  imageAlt,
  meta,
  highlight,
}: NextProjectSectionProps) {
  return (
    <div className="w-full border-t border-zinc-200">
      <div className="w-full max-w-frame mx-center px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-tertiary mb-6">Next Project</p>
        <CaseStudyCard
          tag={tag}
          type={type}
          headline={headline}
          description={description}
          metric={metric}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
          meta={meta}
          highlight={highlight}
        />
      </div>
    </div>
  );
}
