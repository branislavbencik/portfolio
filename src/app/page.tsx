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
    <main id="main-content">
      <div className="w-full max-w-frame mx-center">
        <div className="px-content-x">
          <HeroStatement />
        </div>
      </div>

      {/* Unified single-column feed */}
      <div id="work" className="w-full max-w-frame mx-center flex flex-col scroll-mt-20">
        {projects.map(({ slug, entry }) => (
          <CaseStudyCard
            key={slug}
            isCaseStudy={entry.type === "case-study"}
            year={entry.year || undefined}
            role={entry.role || undefined}
            domain={(entry as { domain?: string }).domain || undefined}
            headline={entry.title}
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

    </main>
  );
}
