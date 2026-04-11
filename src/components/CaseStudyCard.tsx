import Image from "next/image";
import Link from "next/link";
import { ProjectMetaRow } from "./ProjectMetaRow";

interface CaseStudyCardProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  domain?: string;
  headline: string;
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
  primaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="relative py-detail flex flex-col gap-10 group block rounded-none overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas border-t border-b border-surface-2 -mt-px first:mt-0"
    >
      <div className="relative px-content-x">
        <div className="group/image relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border border-surface-3 bg-surface-1"
          />
          <div className="relative motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:group-hover/image:-translate-x-1.5 motion-safe:group-hover/image:-translate-y-1.5 motion-safe:group-focus-visible:-translate-x-1.5 motion-safe:group-focus-visible:-translate-y-1.5">
            <Image
              src={image}
              alt={imageAlt}
              width={1288}
              height={748}
              className="w-full h-auto block"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-surface-3"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 px-content-x max-md:pb-5">
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
        </div>
      </div>
    </Link>
  );
}
