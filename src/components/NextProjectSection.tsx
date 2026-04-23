import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  company: string;
  tagline: string;
  tags?: string[];
  href: string;
  image: string;
  imageAlt: string;
}

export function NextProjectSection({
  company,
  tagline,
  tags,
  href,
  image,
  imageAlt,
}: NextProjectSectionProps) {
  return (
    <div className="w-full">
      <div className="w-full max-w-frame mx-center pt-section pb-section">
        <p className="type-body-m text-text-tertiary mb-8">Next project</p>
        <CaseStudyCard
          company={company}
          tagline={tagline}
          tags={tags}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
        />
      </div>
    </div>
  );
}
