import { CaseStudyCard } from "@/components/CaseStudyCard";
import HeroStatement from "@/components/HeroStatement";
import { reader } from "@/lib/keystatic";

export default async function Home() {
  const allProjects = await reader.collections.projects.all();

  const projects = [...allProjects].sort(
    (a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99)
  );

  return (
    <main id="main-content">
      <div className="w-full max-w-frame mx-center max-lg:px-content-x max-md:px-0">
        <div className="max-md:px-content-x">
          <HeroStatement />
        </div>

        <div id="work" className="flex flex-col gap-24 max-md:gap-12 scroll-mt-20">
          {projects.map(({ slug, entry }) => {
            const e = entry as {
              company?: string;
              tagline?: string;
              tags?: readonly string[];
              title: string;
              description?: string;
              coverImage: unknown;
            };
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
          })}
        </div>
      </div>
    </main>
  );
}
