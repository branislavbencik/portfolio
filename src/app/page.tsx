import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";
import { reader } from "@/lib/keystatic";

type ProjectEntry = {
  company?: string;
  tagline?: string;
  tags?: readonly string[];
  type?: string;
  title: string;
  description?: string;
  coverImage: unknown;
};

export default async function Home() {
  const allProjects = await reader.collections.projects.all();

  const projects = [...allProjects].sort(
    (a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99)
  );

  const caseStudies = projects.filter(
    (p) => (p.entry as ProjectEntry).type === "case-study"
  );
  const selectedProjects = projects.filter(
    (p) => (p.entry as ProjectEntry).type !== "case-study"
  );

  const renderCard = ({ slug, entry }: typeof projects[number]) => {
    const e = entry as ProjectEntry;
    const image =
      typeof e.coverImage === "object" && e.coverImage !== null
        ? (e.coverImage as { src: string }).src
        : (e.coverImage as string) ?? "";
    return (
      <CaseStudyCard
        key={slug}
        company={e.company || e.title}
        tagline={e.tagline || e.description || ""}
        tags={e.tags ? [...e.tags] : undefined}
        primaryHref={`/${slug}`}
        image={image}
        imageAlt={`${e.title} thumbnail`}
      />
    );
  };

  return (
    <main id="main-content">
      <div className="w-full max-w-frame mx-center max-lg:px-content-x">
        <div className="max-md:px-content-x">
          <HeroStatement />
        </div>

        <div id="work" className="scroll-mt-20">
          {caseStudies.length > 0 && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="type-allcaps leading-none text-text-secondary shrink-0">
                  Case studies
                </h2>
                <div aria-hidden="true" className="relative -top-px h-px bg-surface-2 flex-1" />
              </div>
              <div className="flex flex-col gap-16 max-md:gap-10">
                {caseStudies.map(renderCard)}
              </div>
            </section>
          )}

          {selectedProjects.length > 0 && (
            <section className="pt-section">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="type-allcaps leading-none text-text-secondary shrink-0">
                  Selected projects
                </h2>
                <div aria-hidden="true" className="relative -top-px h-px bg-surface-2 flex-1" />
              </div>
              <div className="flex flex-col gap-16 max-md:gap-10">
                {selectedProjects.map(renderCard)}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
