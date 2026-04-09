import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  tags?: string[];
  headline: string;
  href: string;
  image: string;
  imageAlt: string;
}

export function NextProjectSection({
  tags,
  headline,
  href,
  image,
  imageAlt,
}: NextProjectSectionProps) {
  return (
    <div className="w-full">
      <div className="w-full max-w-frame mx-center">
        <div className="px-content-x pt-section">
          <p className="type-allcaps text-text-tertiary mb-6">Next Project</p>
        </div>
        <CaseStudyCard
          tags={tags}
          headline={headline}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
        />
      </div>
    </div>
  );
}
