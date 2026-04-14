import Image from "next/image";
import Link from "next/link";
import { ProjectMetaRow } from "./ProjectMetaRow";

interface CaseStudyCardProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  domain?: string;
  headline: string;
  description?: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
}

export function CaseStudyCard({
  isCaseStudy,
  year,
  role,
  domain,
  headline,
  description,
  primaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="relative group block rounded-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {/* Decorative offset background — revealed on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-surface-1"
      />

      {/* Card content — shifts on hover to reveal the offset background */}
      <div className="relative flex flex-col gap-10 pb-[48px] overflow-hidden motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:group-hover:-translate-x-1.5 motion-safe:group-hover:-translate-y-1.5 motion-safe:group-focus-visible:-translate-x-1.5 motion-safe:group-focus-visible:-translate-y-1.5 bg-canvas border border-transparent group-hover:border-surface-2 group-focus-visible:border-surface-2">
        <div className="relative border-b border-surface-2">
          <Image
            src={image}
            alt={imageAlt}
            width={1288}
            height={748}
            className="w-full h-auto block"
            unoptimized
          />
        </div>

        <div className="relative z-10 px-content-x">
          <div className="max-w-column mx-auto flex flex-col items-start gap-3">
            <ProjectMetaRow
              isCaseStudy={isCaseStudy}
              year={year}
              role={role}
              domain={domain}
            />
            <h2 className="type-h1 text-text-primary">
              {headline}
              <span
                aria-hidden="true"
                className="inline-block pl-[0.25em] text-[0.8em] font-light -translate-x-1 opacity-0 motion-safe:transition-[transform,opacity] motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                →
              </span>
            </h2>
            {description && (
              <p className="type-body-m text-text-secondary">{description}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
