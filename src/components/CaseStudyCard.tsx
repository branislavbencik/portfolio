import Image from "next/image";
import Link from "next/link";

export interface CardTag {
  text: string;
  highlight?: boolean;
}

interface CaseStudyCardProps {
  company: string;
  tagline: string;
  tags?: readonly CardTag[];
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
  const revealTags = (tags ?? []).filter(
    (t): t is CardTag => Boolean(t && t.text && t.text.trim()),
  );

  return (
    <Link
      href={primaryHref}
      className="group block no-underline outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <div className="flex flex-col gap-4 pb-8">
        <div className="relative overflow-hidden aspect-[3/2] bg-surface-2">
          <Image
            src={image}
            alt={imageAlt}
            width={1080}
            height={607}
            className="w-full h-full object-cover block motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] motion-safe:group-hover:scale-[1.02] motion-safe:group-focus-within:scale-[1.02]"
            unoptimized
          />
          {revealTags.length > 0 && (
            <>
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute inset-x-0 bottom-0 h-[60%]",
                  "bg-gradient-to-t from-text-primary/25 via-text-primary/8 to-transparent",
                  "motion-safe:opacity-0",
                  "motion-safe:transition-opacity motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)]",
                  "motion-safe:group-hover:opacity-100 motion-safe:group-focus-within:opacity-100",
                ].join(" ")}
              />
              <div
                aria-hidden="true"
                className={[
                  "pointer-events-none absolute bottom-3 left-3 right-3",
                  "flex flex-wrap gap-1.5",
                  "motion-safe:opacity-0 motion-safe:translate-y-1",
                  "motion-safe:transition-[opacity,transform] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)]",
                  "motion-safe:group-hover:opacity-100 motion-safe:group-hover:translate-y-0",
                  "motion-safe:group-focus-within:opacity-100 motion-safe:group-focus-within:translate-y-0",
                ].join(" ")}
              >
                {revealTags.map((t, i) => (
                  <span
                    key={i}
                    className="type-card-pill inline-flex items-center gap-1 px-2 py-0.5 bg-canvas border border-surface-3 rounded-[2px] text-text-primary"
                  >
                    {t.highlight && (
                      <span aria-hidden="true" className="leading-none">
                        ★
                      </span>
                    )}
                    {t.text}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <h2 className="type-card-title">
          <strong className="text-text-primary font-semibold">{company}</strong>
          <span className="text-text-secondary font-normal"> — {tagline}</span>
        </h2>
      </div>
    </Link>
  );
}
