import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
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
  meta,
  headline,
  primaryHref,
  image,
  imageAlt,
  highlight,
}: CaseStudyCardProps) {
  return (
    <Link
      href={primaryHref}
      className="group block hover:-translate-y-0.5 transition-transform duration-300 ease-out bg-surface-1 shadow-card rounded-xl overflow-hidden no-underline outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090A]"
    >
      {/* Image — full-width, zero padding, top-rounded from parent overflow-hidden */}
      <div className="overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={1288}
          height={748}
          className="w-full h-auto block group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          unoptimized
        />
      </div>

      {/* Content block */}
      <div className="p-6 flex flex-col gap-2">
        <p className="type-tag text-text-tertiary">{meta}</p>
        <h2 className="type-h1 text-text-primary">{headline}</h2>
        {highlight && (
          <p className="type-tag text-text-tertiary mt-1">{highlight}</p>
        )}
      </div>
    </Link>
  );
}
