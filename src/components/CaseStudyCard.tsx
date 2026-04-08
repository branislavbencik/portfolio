import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  tag?: string;
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
  tag,
  meta,
  headline,
  primaryHref,
  image,
  imageAlt,
  description,
  highlight,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="group block bg-white border-y border-zinc-200 rounded-none overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {/* Image — full-width, zero padding, clipped by parent overflow-hidden */}
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

      {/* Content block */}
      <div className="px-content-x py-6 flex flex-col gap-2">
        {/* Metadata row: pill + meta inline */}
        <div className="flex items-center gap-2 flex-wrap">
          {tag && <span className="inline-flex items-center border border-zinc-200 text-zinc-500 font-mono text-[12px] uppercase px-2 py-0.5 rounded-none">{tag}</span>}
          <p className="type-tag text-text-tertiary">{meta}</p>
        </div>
        <h2 className="type-h1 text-text-primary">{headline}</h2>
        {description && (
          <p className="type-tag text-text-secondary line-clamp-1">{description}</p>
        )}
        {highlight && (
          <p className="type-tag text-text-tertiary">{highlight}</p>
        )}
      </div>
    </Link>
  );
}
