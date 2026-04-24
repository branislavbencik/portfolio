import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PlaygroundCard } from "@/components/PlaygroundCard";
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
  const playground = projects.filter(
    (p) => (p.entry as ProjectEntry).type === "playground"
  );
  const selectedProjects = projects.filter((p) => {
    const t = (p.entry as ProjectEntry).type;
    return t !== "case-study" && t !== "playground";
  });

  const resolveImage = (e: ProjectEntry) =>
    typeof e.coverImage === "object" && e.coverImage !== null
      ? (e.coverImage as { src: string }).src
      : (e.coverImage as string) ?? "";

  const renderCaseStudyCard = ({ slug, entry }: typeof projects[number]) => {
    const e = entry as ProjectEntry;
    return (
      <CaseStudyCard
        key={slug}
        company={e.company || e.title}
        tagline={e.tagline || e.description || ""}
        tags={e.tags ? [...e.tags] : undefined}
        primaryHref={`/${slug}`}
        image={resolveImage(e)}
        imageAlt={`${e.title} thumbnail`}
        cursorLabel="View case study"
      />
    );
  };

  const renderSelectedCard = ({ slug, entry }: typeof projects[number]) => {
    const e = entry as ProjectEntry;
    return (
      <CaseStudyCard
        key={slug}
        company={e.company || e.title}
        tagline={e.tagline || e.description || ""}
        tags={e.tags ? [...e.tags] : undefined}
        primaryHref={`/${slug}`}
        image={resolveImage(e)}
        imageAlt={`${e.title} thumbnail`}
        cursorLabel="View project"
      />
    );
  };

  const renderPlaygroundCard = ({ slug, entry }: typeof projects[number]) => {
    const e = entry as ProjectEntry;
    return (
      <PlaygroundCard
        key={slug}
        title={e.company || e.title}
        description={e.description || e.tagline || ""}
        liveHref="https://reprio.vercel.app/"
        image={resolveImage(e)}
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
                {caseStudies.map(renderCaseStudyCard)}
              </div>
            </section>
          )}

          {playground.length > 0 && (
            <section className="pt-section">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="type-allcaps leading-none text-text-secondary shrink-0">
                  Playground
                </h2>
                <div aria-hidden="true" className="relative -top-px h-px bg-surface-2 flex-1" />
              </div>
              <div className="flex flex-col gap-16 max-md:gap-10">
                {playground.map(renderPlaygroundCard)}
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
                {selectedProjects.map(renderSelectedCard)}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
