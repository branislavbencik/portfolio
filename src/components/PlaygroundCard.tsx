import Image from "next/image";
import Link from "next/link";

interface PlaygroundCardProps {
  title: string;
  description: string;
  liveHref: string;
  image: string;
  imageAlt: string;
}

export function PlaygroundCard({
  title,
  description,
  liveHref,
  image,
  imageAlt,
}: PlaygroundCardProps) {
  return (
    <Link
      href={liveHref}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-label="See it live ↗"
      data-cursor-label-tone="inverted"
      className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas rounded-[6px] motion-safe:transition-transform motion-safe:duration-[180ms] motion-safe:ease-out motion-safe:hover:scale-[1.005] active:scale-[0.995]"
    >
      <article className="relative w-full overflow-hidden rounded-[6px] bg-playground-canvas pt-10 px-10 pb-0 max-lg:pt-8 max-lg:px-8 max-md:pt-6 max-md:px-6">
        <header className="flex gap-10 items-start mb-8 max-lg:flex-col max-lg:gap-4 max-md:mb-6">
          <h3 className="flex-1 type-h1 text-playground-text">
            {title}
          </h3>
          <p className="flex-1 type-body-m text-playground-text-dim">
            {description}
          </p>
        </header>

        <div className="rounded-t-[6px] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            width={2688}
            height={1032}
            className="w-full h-auto block"
            unoptimized
          />
        </div>
      </article>
    </Link>
  );
}
