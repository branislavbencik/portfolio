import Image from "next/image";
import Link from "next/link";
import { TagPill } from "./TagPill";

interface SelectedProjectCardProps {
  href: string;
  image: string;
  imageAlt: string;
  tag: string;
  headline: string;
  meta: string;
}

export default function SelectedProjectCard({
  href,
  image,
  imageAlt,
  tag,
  headline,
  meta,
}: SelectedProjectCardProps) {
  return (
    <Link href={href} className="group flex flex-col no-underline text-foreground gap-selected-card">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-sm border border-border-light bg-background-alt">
        <Image
          src={image}
          alt={imageAlt}
          width={558}
          height={380}
          className="w-full h-auto block"
          unoptimized
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1">
        <h3 className="type-subheadline group-hover:opacity-70 transition-opacity">
          {headline}
        </h3>
        <p className="type-allcaps text-foreground-secondary">
          {meta}
        </p>
        <div className="pt-1">
          <TagPill>{tag}</TagPill>
        </div>
      </div>
    </Link>
  );
}
