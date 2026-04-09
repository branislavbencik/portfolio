import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  tags?: string[];
  headline: string;
  metric?: string;
  href: string;
  image: string;
  imageAlt: string;
}

export function NextProjectSection({
  tags,
  headline,
  metric,
  href,
  image,
  imageAlt,
}: NextProjectSectionProps) {
  return (
    <div className="w-full border-t border-zinc-200">
      <div className="w-full max-w-frame mx-center px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-tertiary mb-6">Next Project</p>
        <CaseStudyCard
          tags={tags}
          headline={headline}
          metric={metric}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
        />
      </div>
    </div>
  );
}
