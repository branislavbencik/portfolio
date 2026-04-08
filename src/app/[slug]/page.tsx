import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ContributionList } from "@/components/ContributionList";
import { ImpactBar } from "@/components/ImpactBar";
import { WorkSection } from "@/components/WorkSection";
import { CaptionedImage } from "@/components/CaptionedImage";
import { NextProjectCard } from "@/components/NextProjectCard";

export async function generateStaticParams() {
  const projects = await reader.collections.projects.all();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);
  if (!project) notFound();

  const isCaseStudy = project.type === "case-study";

  const coverImage =
    typeof project.coverImage === "object" && project.coverImage !== null
      ? (project.coverImage as { src: string }).src
      : (project.coverImage as string) ?? "";

  return (
    <>
      <main>
        <ProjectHeader
          title={project.title}
          domainTag={project.domainTag || undefined}
          role={project.role || undefined}
          year={project.year || undefined}
          intro={project.intro || undefined}
          heroImage={coverImage}
          heroImageAlt={`${project.title} overview`}
        />

        {isCaseStudy && project.contributions.length > 0 && (
          <ContributionList items={project.contributions as string[]} />
        )}

        {isCaseStudy && project.impactItems.length > 0 && (
          <ImpactBar
            items={(project.impactItems as { value: string; label: string }[]).map((item) => ({
              value: item.value,
              label: item.label,
            }))}
          />
        )}

        {project.sections.map((section, i) => {
          const images = (section.images as {
            src: string;
            alt: string;
            caption?: string | null;
            border: boolean;
            background: boolean;
            rounded: boolean;
            width?: number | null;
          }[]);

          if (section.title) {
            return (
              <WorkSection
                key={i}
                label={section.label || undefined}
                title={section.title}
                description={section.description || undefined}
              >
                {images.map((img, j) => (
                  <CaptionedImage
                    key={j}
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption || undefined}
                    border={img.border}
                    background={img.background}
                    rounded={img.rounded}
                    width={img.width ?? undefined}
                  />
                ))}
              </WorkSection>
            );
          }

          // Section without title — flat image gallery (selected projects)
          return (
            <div
              key={i}
              className="w-full max-w-frame mx-center px-content-x py-detail flex flex-col gap-detail"
            >
              {images.map((img, j) => (
                <CaptionedImage
                  key={j}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption || undefined}
                  border={img.border}
                  background={img.background}
                  rounded={img.rounded}
                  width={img.width ?? undefined}
                />
              ))}
            </div>
          );
        })}
      </main>

      <NextProjectCard currentSlug={slug} />
    </>
  );
}
