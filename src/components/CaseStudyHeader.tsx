import Image from "next/image";
import { MetadataRow } from "./MetadataRow";

interface CaseStudyHeaderProps {
  company: string;
  role?: string;
  year: string;
  headline: string;
  heroImage?: string;
  heroImageAlt?: string;
  children: React.ReactNode;
}

export function CaseStudyHeader({
  company,
  role,
  year,
  headline,
  heroImage,
  heroImageAlt,
  children,
}: CaseStudyHeaderProps) {
  return (
    <section className="w-full max-w-frame mx-auto px-content-x py-section">
      {/* Text block — centered reading column */}
      <div className={`max-w-text mx-auto w-full ${heroImage ? "mb-16" : ""}`}>
        <MetadataRow company={company} role={role} year={year} />
        <h1 className="type-h1 text-foreground my-4">
          {headline}
        </h1>
        <div className="type-l text-foreground-secondary">
          {children}
        </div>
      </div>

      {/* Hero image — full content width */}
      {heroImage && (
        <div className="relative w-full overflow-hidden rounded-md border border-border-light bg-background-alt">
          <Image
            src={heroImage}
            alt={heroImageAlt ?? ""}
            width={1128}
            height={752}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
      )}
    </section>
  );
}
