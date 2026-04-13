import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FullWidthDivider } from "@/components/FullWidthDivider";
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
      <div id="work" className="flex flex-col scroll-mt-20">
        {projects.map(({ slug, entry }) => (
          <div key={slug}>
            <FullWidthDivider />
            <CaseStudyCard
              isCaseStudy={entry.type === "case-study"}
              year={entry.year || undefined}
              role={entry.role || undefined}
              domain={(entry as { domain?: string }).domain || undefined}
              headline={entry.title}
              description={entry.type === "case-study" ? entry.description || undefined : undefined}
              primaryHref={`/${slug}`}
              image={
                typeof entry.coverImage === "object" && entry.coverImage !== null
                  ? (entry.coverImage as { src: string }).src
                  : (entry.coverImage as string) ?? ""
              }
              imageAlt={`${entry.title} thumbnail`}
            />
          </div>
        ))}
      </div>

    </main>
  );
}
