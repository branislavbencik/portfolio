import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  tag?: string;
  type?: "case-study" | "selected";
  headline: string;
  description?: string;
  metric?: string;
  primaryHref: string;
  image: string;
  imageAlt: string;
  // Legacy props kept for backward compatibility with MDX inline usage
  meta?: string;
  highlight?: React.ReactNode;
}

export function CaseStudyCard({
  tag,
  type,
  headline,
  description,
  metric,
  primaryHref,
  image,
  imageAlt,
  meta,
  highlight,
}: CaseStudyCardProps) {
  const displayMetric = metric || (typeof highlight === "string" ? highlight : undefined);
  const displaySub = description || meta;

  return (
    <Link
      href={primaryHref}
      className="group block bg-white border border-zinc-200 rounded-none overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {/* Image — full-width, border-b creates a hard line above the text block */}
      <div className="overflow-hidden border-b border-zinc-200">
        <Image
          src={image}
          alt={imageAlt}
          width={1288}
          height={748}
          className="w-full h-auto block"
          unoptimized
        />
      </div>

      {/* Text block — 12-column data grid */}
      <div className="grid grid-cols-12 gap-4 p-4 max-md:grid-cols-1">
        {/* Left (cols 1–2): stacked domain + type tags */}
        <div className="col-span-2 flex flex-col gap-1 max-md:col-span-1">
          {tag && (
            <span className="border border-zinc-200 text-zinc-500 font-mono text-[12px] uppercase px-2 py-0.5 rounded-none inline-block w-fit">
              {tag}
            </span>
          )}
        </div>

        {/* Middle (cols 3–9): headline + 1-liner */}
        <div className="col-span-7 flex flex-col gap-1 max-md:col-span-1">
          <h2 className="type-h2 text-text-primary">{headline}</h2>
          {displaySub && (
            <p className="type-body-s text-zinc-500 truncate">{displaySub}</p>
          )}
        </div>

        {/* Right (cols 10–12): metric — empty grid cell if absent */}
        <div className="col-span-3 flex items-start justify-end max-md:justify-start max-md:col-span-1">
          {displayMetric && (
            <span className="type-tag text-text-tertiary text-right">{displayMetric}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
