import Image from "next/image";
import Link from "next/link";
import { ProjectMetaRow } from "./ProjectMetaRow";

interface CaseStudyCardProps {
  isCaseStudy?: boolean;
  company?: string;
  year?: string;
  role?: string;
  headline: string;
  tags?: readonly string[];
  primaryHref: string;
  image: string;
  imageAlt: string;
}

export function CaseStudyCard({
  isCaseStudy,
  company,
  year,
  role,
  headline,
  tags,
  primaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  const visibleTags = tags?.filter((t) => t && t.trim()).slice(0, 3) ?? [];

  return (
    <Link
      href={primaryHref}
      className="group block rounded-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="flex flex-col gap-6 pb-8">
        <Image
          src={image}
          alt={imageAlt}
          width={1080}
          height={607}
          className="w-full h-auto block motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out group-hover:opacity-90 group-focus-visible:opacity-90"
          unoptimized
        />

        <div className="flex flex-col items-start gap-3">
          <ProjectMetaRow
            isCaseStudy={isCaseStudy}
            company={company}
            year={year}
            role={role}
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
          {visibleTags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {visibleTags.map((t) => (
                <li
                  key={t}
                  className="type-tag px-2 py-0.5 border border-surface-3 text-text-secondary"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
}
