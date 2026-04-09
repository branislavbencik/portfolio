import Image from "next/image";
import Link from "next/link";
import { ProjectTags } from "./ProjectTags";

interface CaseStudyCardProps {
  tags?: string[];
  headline: string;
  summary?: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
  auraColor?: string;
}

export function CaseStudyCard({
  tags,
  headline,
  summary,
  primaryHref,
  image,
  imageAlt,
  auraColor,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="relative py-detail flex flex-col gap-10 group block rounded-none overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas border-t border-b border-surface-2 -mt-px first:mt-0"
    >

      {/* Header block — tags + headline; z-10 keeps text above the aura bleed */}
      <div className="relative z-10 px-content-x max-md:pb-5">
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          {tags && tags.length > 0 && <ProjectTags tags={tags} />}
          <h2 className="type-h1 text-text-primary">{headline}</h2>
          {summary && (
            <p className="type-body-s text-text-tertiary">{summary}</p>
          )}
        </div>
      </div>

      {/* Image area — aura bleeds upward into header via blur, no overflow clipping */}
      <div className="relative px-content-x max-md:pb-8">
        {auraColor && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-full h-full blur-[140px] opacity-30 group-hover:opacity-60 transition-opacity duration-300 ease-out"
              style={{ backgroundColor: auraColor }}
            />
          </div>
        )}
        <div className="relative z-10 bg-surface-1 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-1.5">
          <Image
            src={image}
            alt={imageAlt}
            width={1288}
            height={748}
            className="w-full h-auto block"
            unoptimized
          />
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.14)] transition-shadow duration-200 ease-out pointer-events-none" />
        </div>
      </div>
    </Link>
  );
}
