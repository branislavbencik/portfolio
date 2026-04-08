import Image from "next/image";
import Link from "next/link";

export interface SelectedProjectCardProps {
  href?: string;
  image: string;
  imageAlt: string;
  tag: string;
  headline: string;
  meta: string;
  onClick?: () => void;
}

export default function SelectedProjectCard({
  href,
  image,
  imageAlt,
  tag,
  headline,
  meta,
  onClick,
}: SelectedProjectCardProps) {
  const inner = (
    <>
      {/* Thumbnail — 3:2 aspect ratio */}
      <div className="overflow-hidden rounded-lg shadow-border-subtle group-hover:shadow-border transition-shadow duration-200 bg-background-alt">
        <Image
          src={image}
          alt={imageAlt}
          width={558}
          height={372}
          className="w-full h-auto block"
          unoptimized
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3 className="type-label text-text-primary group-hover:opacity-70 transition-opacity duration-200">
          {headline}
        </h3>
        <p className="type-tag text-text-tertiary">{tag} · {meta}</p>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group flex flex-col no-underline gap-selected-card outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas">
        {inner}
      </Link>
    );
  }

  return (
    <div className="group flex flex-col gap-selected-card cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas" onClick={onClick}>
      {inner}
    </div>
  );
}
