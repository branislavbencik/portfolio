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
        <div className="relative z-10 bg-surface-1 ring-1 ring-inset ring-surface-2 group-hover:ring-surface-3 motion-safe:transition-[box-shadow] duration-200 ease-out">
          <Image
            src={image}
            alt={imageAlt}
            width={1288}
            height={748}
            className="w-full h-auto block"
            unoptimized
          />
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
          <h2 className="type-h1 text-text-primary">{headline}</h2>
        </div>
      </div>
    </Link>
  );
}
