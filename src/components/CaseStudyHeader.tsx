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
      <div className="max-w-text mx-auto w-full" style={{ marginBottom: heroImage ? "64px" : "0" }}>
        <MetadataRow company={company} role={role} year={year} />
        <h1
          className="font-semibold text-foreground"
          style={{
            fontSize: "64px",
            lineHeight: "1",
            letterSpacing: "-0.04em",
            marginTop: "16px",
            marginBottom: "24px",
          }}
        >
          {headline}
        </h1>
        <div className="text-[20px] leading-[1.5] text-foreground-secondary">
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
