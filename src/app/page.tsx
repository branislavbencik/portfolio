import { CaseStudyCard, type CardTag } from "@/components/CaseStudyCard";
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
      <div className="w-full max-w-frame mx-center max-lg:px-content-x">
        <HeroStatement />

        <div id="work" className="scroll-mt-20">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-6">
            {projects.map(({ slug, entry }) => (
              <CaseStudyCard
                key={slug}
                company={entry.company || ""}
                tagline={entry.tagline || entry.title}
                tags={entry.tags as readonly CardTag[]}
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
        </div>
      </div>
    </main>
  );
}
