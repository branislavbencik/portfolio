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
  const panelTokens = [role, ...(tags ?? [])]
    .filter((t): t is string => Boolean(t && t.trim()))
    .slice(0, 4);

  return (
    <Link
      href={primaryHref}
      className="group block rounded-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="flex flex-col gap-6 pb-8">
        <div className="relative overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            width={1080}
            height={607}
            className="w-full h-auto block motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-out group-hover:opacity-[0.92] group-focus-visible:opacity-[0.92]"
            unoptimized
          />
          {panelTokens.length > 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 bg-canvas px-5 py-4 translate-y-full motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
            >
              <p className="type-allcaps text-text-secondary">
                {panelTokens.join(" · ")}
              </p>
            </div>
          )}
        </div>

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
        </div>
      </div>
    </Link>
  );
}
