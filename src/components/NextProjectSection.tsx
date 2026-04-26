import { CaseStudyCard } from "./CaseStudyCard";

interface NextProjectSectionProps {
  company: string;
  title: string;
  tags?: string[];
  href: string;
  image: string;
  imageAlt: string;
}

export function NextProjectSection({
  company,
  title,
  tags,
  href,
  image,
  imageAlt,
}: NextProjectSectionProps) {
  return (
    <div className="w-full pt-section">
      <div
        aria-hidden="true"
        className="relative w-screen h-px bg-surface-2 left-1/2 -translate-x-1/2"
      />
      <div className="w-full max-w-frame mx-center max-lg:px-content-x pt-section">
        <p className="type-caption text-text-secondary mb-8">Next project</p>
        <CaseStudyCard
          company={company}
          title={title}
          tags={tags}
          primaryHref={href}
          image={image}
          imageAlt={imageAlt}
        />
      </div>
    </div>
  );
}
