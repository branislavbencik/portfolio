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
    <div className="flex items-stretch" style={{ gap: "48px" }}>
      {/* Left — text ~35% */}
      <div className="flex flex-col justify-between" style={{ flex: "0 0 35%" }}>
        <div className="flex flex-col gap-5">
          <p className="text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase text-foreground-secondary">
            {meta}
          </p>
          <h2 className="font-semibold text-foreground type-h2">
            {headline}
          </h2>
          {description && (
            <p className="text-[18px] leading-[1.5] text-foreground-secondary">
              {description}
            </p>
          )}
          {highlight && (
            <div><TagPill>{highlight}</TagPill></div>
          )}
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <Link
            href={primaryHref}
            className="inline-block px-5 py-3 bg-foreground text-white text-[16px] font-semibold leading-[1.4] rounded-sm no-underline hover:opacity-80 transition-opacity"
          >
            View Case Study
          </Link>
          {secondaryLabel && secondaryHref && (
            <a
              href={secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[16px] leading-[1.4] text-foreground no-underline hover:opacity-60 transition-opacity"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />
              {secondaryLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Right — image ~65% */}
      <div className="flex-1 min-w-0">
        <Link href={primaryHref} className="block">
          <div className="relative w-full aspect-[744/432] overflow-hidden rounded-md border border-border-light bg-background-alt">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 65vw, 780px"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
