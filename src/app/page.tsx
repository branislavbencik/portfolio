import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";
import { reader } from "@/lib/keystatic";

// Project-specific Aura Glow colors — values live in globals.css as --aura-{slug} tokens
const AURA_COLORS: Record<string, string> = {
  skoala:     "var(--aura-skoala)",
  teatime:    "var(--aura-teatime)",
  nnspect:    "var(--aura-nnspect)",
  sakurabook: "var(--aura-sakurabook)",
  crowdberry: "var(--aura-crowdberry)",
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
