import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";
import { reader } from "@/lib/keystatic";

export default async function Home() {
  const allProjects = await reader.collections.projects.all();

  // Sort by explicit order field; fall back to slug alphabetical
  const projects = [...allProjects].sort(
    (a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99)
  );

  return (
    <main className="w-full max-w-frame mx-center">
      <div className="px-content-x">
        <HeroStatement />
      </div>

      {/* Unified single-column feed */}
      <div className="flex flex-col gap-4 py-section">
        {projects.map(({ slug, entry }) => (
          <CaseStudyCard
            key={slug}
            tag={entry.domainTag || undefined}
            type={(entry.type as "case-study" | "selected") || undefined}
            headline={entry.title}
            description={entry.description || undefined}
            metric={entry.metric || undefined}
            primaryHref={`/${slug}`}
            image={
              typeof entry.coverImage === "object" && entry.coverImage !== null
                ? (entry.coverImage as { src: string }).src
                : (entry.coverImage as string) ?? ""
            }
            imageAlt={`${entry.title} thumbnail`}
          />
        ))}
      </div>

      {/* Archive section */}
      <section className="px-content-x pt-section pb-section border-t border-zinc-200 flex flex-col gap-8">
        <h2 className="type-h2 text-text-primary">More Work</h2>
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-md:grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-3/2 bg-zinc-50 border border-zinc-200 rounded-none" />
          ))}
        </div>
      </section>
    </main>
  );
}
