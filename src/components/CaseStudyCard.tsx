import Image from "next/image";
import Link from "next/link";
import { ProjectMetaRow } from "./ProjectMetaRow";

interface CaseStudyCardProps {
  isCaseStudy?: boolean;
  year?: string;
  role?: string;
  headline: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
}

export function CaseStudyCard({
  isCaseStudy,
  year,
  role,
  headline,
  primaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="group block rounded-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="flex flex-col gap-6 pb-detail">
        <Image
          src={image}
          alt={imageAlt}
          width={1080}
          height={628}
          className="w-full h-auto block motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out group-hover:opacity-90 group-focus-visible:opacity-90"
          unoptimized
        />

        <div className="flex flex-col items-start gap-3">
          <ProjectMetaRow isCaseStudy={isCaseStudy} year={year} role={role} />
          <h2 className="type-h2 text-text-primary">
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
