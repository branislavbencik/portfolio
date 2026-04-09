import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  tags?: string[];
  headline: string;
  metric?: string;
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
      className="relative py-detail flex flex-col gap-10 group block rounded-none overflow-visible no-underline outline-none shadow-[inset_0_1px_0_0_var(--color-surface-2),inset_0_-1px_0_0_var(--color-surface-2)] hover:shadow-[inset_0_0_0_1px_#000] focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas transition-all duration-150 ease-out hover:-translate-y-1"
    >
      {/* Reticle corners */}
      <span className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10" />
      <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10" />
      <span className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10" />
      <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-zinc-900 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10" />

      {/* Header block — tags + headline; z-10 keeps text above the aura bleed */}
      <div className="relative z-10 max-w-[720px] mx-auto flex flex-col items-center text-center gap-3 max-md:px-6 max-md:pb-5">
        {tags && tags.length > 0 && (() => {
          const hasCaseStudy = tags.some((t) => t.toUpperCase() === "CASE STUDY");
          const others = tags.filter((t) => t.toUpperCase() !== "CASE STUDY");
          return (
            <div className="flex items-baseline flex-wrap justify-center">
              {hasCaseStudy && (
                <span className="bg-black text-white type-tag px-2.5 py-1 inline-block shrink-0">
                  Case Study
                </span>
              )}
              {hasCaseStudy && others.length > 0 && (
                <span className="type-allcaps text-text-tertiary mx-2">·</span>
              )}
              {others.length > 0 && (
                <span className="type-allcaps text-text-tertiary">
                  {others.join(" · ")}
                </span>
              )}
            </div>
          );
        })()}
        <h2 className="type-h1 text-text-primary">{headline}</h2>
      </div>

      {/* Image area — aura bleeds upward into header via blur, no overflow clipping */}
      <div className="relative px-16 max-md:px-6 max-md:pb-8">
        {auraColor && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-3/4 h-3/4 blur-[80px] aura-drift"
              style={{ backgroundColor: auraColor }}
            />
          </div>
        )}
        <div className="relative z-10 bg-surface-1 rounded-[4px]">
          <Image
            src={image}
            alt={imageAlt}
            width={1288}
            height={748}
            className="w-full h-auto block rounded-[4px]"
            unoptimized
          />
          <div className="absolute inset-0 rounded-[4px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] pointer-events-none" />
        </div>
      </div>
    </Link>
  );
}
