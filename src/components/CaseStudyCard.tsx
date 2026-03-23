import Image from "next/image";
import Link from "next/link";
import { TagPill } from "./TagPill";

interface CaseStudyCardProps {
  meta: string;
  headline: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
  description?: string;
  highlight?: React.ReactNode;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CaseStudyCard({
  meta,
  headline,
  primaryHref,
  image,
  imageAlt,
  description,
  highlight,
  secondaryLabel,
  secondaryHref,
}: CaseStudyCardProps) {
  return (
    <div className="flex items-stretch  gap-12 max-lg:gap-4 max-lg:flex-col-reverse">
      {/* Left — text ~35% (desktop) / full-width horizontal bar (max-xl) / column (max-md) */}
      <div className="flex flex-col justify-between shrink-0 grow-0 basis-[35%] max-lg:basis-auto max-lg:w-full max-lg:flex-row max-lg:flex-wrap max-lg:items-start max-lg:justify-between max-lg:gap-x-8 max-lg:gap-y-2 max-md:flex-col max-md:justify-start max-md:gap-5">
        {/* Main content: meta above headline on desktop; meta moves below headline at max-xl via order */}
        <div className="flex flex-col gap-4 max-lg:flex-1 max-lg:gap-2">
          <p className="type-allcaps text-foreground-secondary max-lg:order-last max-md:order-first">
            {meta}
          </p>
          <h2 className="type-h2 text-foreground">
            {headline}
          </h2>
          {description && (
            <p className="type-m text-foreground-secondary max-lg:hidden max-md:block">
              {description}
            </p>
          )}
          {highlight && (
            <div className="max-lg:hidden max-md:block max-md:pt-2"><TagPill>{highlight}</TagPill></div>
          )}
        </div>

        {/* Condensed right side — highlight only, visible at max-xl (hidden on desktop and max-md) */}
        <div className="hidden max-lg:flex max-md:hidden items-start shrink-0 max-lg:pt-2">
          {highlight && <TagPill>{highlight}</TagPill>}
        </div>

        {/* CTAs — hidden at max-xl, shown again at max-md */}
        <div className="flex items-center gap-5 flex-wrap max-lg:hidden">
          <Link
            href={primaryHref}
            className="inline-block px-5 py-3 bg-foreground text-white type-button rounded-sm no-underline hover:opacity-80 transition-opacity"
          >
            View Case Study
          </Link>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 type-button text-foreground no-underline hover:opacity-60 transition-opacity"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-accent-live" />
              {secondaryLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Right — image ~65% (desktop) / full-width top (max-xl via flex-col-reverse) */}
      <div className="flex-1 min-w-0">
        <Link href={primaryHref} className="block">
          <div className="relative w-full aspect-[744/432] overflow-hidden rounded-md border border-border-light bg-background-alt">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 100vw, 65vw"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
