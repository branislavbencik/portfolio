import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  domain?: string;
  headline: string;
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
          isCaseStudy={isCaseStudy}
          year={year}
          role={role}
          domain={domain}
          headline={headline}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
        />
      </div>
    </div>
  );
}
