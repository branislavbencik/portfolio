import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  domain?: string;
  headline: string;
  description?: string;
  href: string;
  image: string;
  imageAlt: string;
}

export function NextProjectSection({
  isCaseStudy,
  year,
  role,
  domain,
  headline,
  description,
  href,
  image,
  imageAlt,
}: NextProjectSectionProps) {
  return (
    <div className="w-full">
      <div className="w-full max-w-frame mx-center">
        <div className="border-t border-surface-2" />
        <div className="px-content-x pt-section">
          <p className="type-allcaps text-text-tertiary mb-6">Next Project</p>
        </div>
      </div>
      <div className="w-full max-w-frame mx-center">
        <hr className="border-t border-surface-2 w-full" />
      </div>
      <div className="w-full max-w-frame mx-center">
        <CaseStudyCard
          isCaseStudy={isCaseStudy}
          year={year}
          role={role}
          domain={domain}
          headline={headline}
          description={description}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
          borderless
        />
      </div>
    </div>
  );
}
