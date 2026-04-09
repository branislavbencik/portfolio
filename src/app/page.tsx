import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";
import { reader } from "@/lib/keystatic";

// Project-specific Aura Glow colors (10–15% opacity rgba halos per DESIGN.md)
const AURA_COLORS: Record<string, string> = {
  skoala:     "rgba(20,  184, 166, 0.2)",  // Teal — matches sidebar/brand
  teatime:    "rgba(180, 120, 60,  0.2)",  // Warm amber — earthy photography tone
  nnspect:    "rgba(249, 115, 22,  0.2)",  // Orange — primary action accent
  sakurabook: "rgba(139, 92,  246, 0.2)",  // Violet — calendar/buttons/logo
  crowdberry: "rgba(236, 72,  153, 0.2)",  // Pink — berry logo mark
};

export default async function Home() {
  const allProjects = await reader.collections.projects.all();

  // Sort by explicit order field; fall back to slug alphabetical
  const projects = [...allProjects].sort(
    (a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99)
  );

  return (
    <main id="main-content">
      <div className="w-full max-w-frame mx-center">
        <div className="px-content-x">
          <HeroStatement />
        </div>
      </div>

      {/* Unified single-column feed */}
      <div className="w-full max-w-frame mx-center flex flex-col">
        {projects.map(({ slug, entry }) => (
          <CaseStudyCard
            key={slug}
            tags={(entry.tags as string[]).slice(0, 3)}
            headline={entry.title}
            summary={entry.description || undefined}
            primaryHref={`/${slug}`}
            image={
              typeof entry.coverImage === "object" && entry.coverImage !== null
                ? (entry.coverImage as { src: string }).src
                : (entry.coverImage as string) ?? ""
            }
            imageAlt={`${entry.title} thumbnail`}
            auraColor={AURA_COLORS[slug]}
          />
        ))}
      </div>

      {/* Archive section — commented out until content is ready
      <section className="px-content-x pt-section pb-section flex flex-col gap-8">
        <p className="type-allcaps text-text-tertiary">More work</p>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-3/2 bg-zinc-50 border border-zinc-200 rounded-none" />
          ))}
        </div>
      </section>
      */}
    </main>
  );
}
