import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  company: string;
  tagline: string;
  tags?: string[];
  primaryHref: string;
  image: string;
  imageAlt: string;
}

export function CaseStudyCard({
  company,
  tagline,
  tags,
  primaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-[6px] motion-safe:transition-transform motion-safe:duration-[120ms] motion-safe:ease-out active:scale-[0.99]"
    >
      <article className="relative w-full border border-surface-2 rounded-[6px] p-[4px] bg-canvas">
        <div className="overflow-hidden border border-surface-2 rounded-[4px] bg-surface-tile">
          <Image
            src={image}
            alt={imageAlt}
            width={952}
            height={535}
            className="w-full h-auto block"
            unoptimized
          />
        </div>

        <div
          className="
            flex items-baseline gap-4 px-3 py-3 max-md:px-2
            max-md:flex-col max-md:items-start max-md:gap-2
          "
        >
          <h2 className="type-card-title text-text-primary flex-1 min-w-0 truncate">
            <strong className="font-semibold">{company}</strong>
            <span className="font-normal"> — {tagline}</span>
            <span
              aria-hidden="true"
              className="inline-block pl-[0.3em] font-light opacity-0 -translate-x-1 motion-safe:transition-[transform,opacity] motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            >
              →
            </span>
          </h2>

          {tags && tags.length > 0 && (
            <div className="flex items-baseline flex-wrap gap-1.5 shrink-0">
              {tags.map((t, i) => (
                <span key={i} className="type-tag-chip">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
