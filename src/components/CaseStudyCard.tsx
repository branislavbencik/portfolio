import Image from "next/image";
import Link from "next/link";
import { ProjectTags } from "./ProjectTags";

interface CaseStudyCardProps {
  tags?: string[];
  headline: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
  auraColor?: string;
}

export function CaseStudyCard({
  tags,
  headline,
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

      {/* Image area — aura bleeds around the image via blur */}
      <div className="relative px-content-x">
        {auraColor && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-full h-full blur-[80px] opacity-30"
              style={{ backgroundColor: auraColor }}
            />
          </div>
        )}
        <div className="relative z-10 bg-surface-1 motion-safe:transition-shadow motion-safe:duration-200 ease-out group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <Image
            src={image}
            alt={imageAlt}
            width={1288}
            height={748}
            className="w-full h-auto block"
            unoptimized
          />
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.18)] transition-shadow duration-200 ease-out pointer-events-none" />
        </div>
      </div>

      {/* Text block — tags + headline below the image */}
      <div className="relative z-10 px-content-x max-md:pb-5">
        <div className="max-w-column mx-auto flex flex-col items-start gap-3">
          {tags && tags.length > 0 && <ProjectTags tags={tags} />}
          <h2 className="type-h1 text-text-primary">{headline}</h2>
        </div>
      </div>
    </Link>
  );
}
