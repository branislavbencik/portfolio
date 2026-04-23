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
  /** When true, drops the card's own borders. Use when the card sits inside a pre-framed container (e.g. NextProjectSection inside [slug]/layout's border-x frame) so you don't get adjacent-border stacking. */
  borderless?: boolean;
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
  borderless = false,
}: CaseStudyCardProps) {
  const frameClasses = borderless
    ? "relative bg-canvas overflow-hidden motion-safe:transition-colors motion-safe:duration-[320ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-surface-1 group-focus-visible:bg-surface-1"
    : "relative bg-canvas border border-surface-2 motion-safe:transition-colors motion-safe:duration-[320ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-surface-1 group-focus-visible:bg-surface-1";

  const innerClasses = borderless
    ? "relative flex flex-col gap-6 pb-detail bg-canvas origin-center will-change-transform [backface-visibility:hidden] motion-safe:transition-transform motion-safe:duration-[320ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[0.97] motion-safe:group-focus-visible:scale-[0.97]"
    : "relative flex flex-col gap-6 pb-detail -m-px bg-canvas border border-surface-2 overflow-hidden origin-center will-change-transform [backface-visibility:hidden] motion-safe:transition-transform motion-safe:duration-[320ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[0.97] motion-safe:group-focus-visible:scale-[0.97]";

  return (
    <Link
      href={primaryHref}
      className="relative group block rounded-none no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className={frameClasses}>
        <div className={innerClasses}>
          <div className="relative border-b border-surface-2">
          <Image
            src={image}
            alt={imageAlt}
            width={1080}
            height={628}
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
                  className="inline-block pl-[0.25em] text-[0.8em] font-light -translate-x-1 opacity-0 motion-safe:transition-[transform,opacity] motion-safe:duration-[320ms] motion-safe:ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
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
      </div>
    </Link>
  );
}
