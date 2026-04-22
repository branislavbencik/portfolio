import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ContributionList } from "@/components/ContributionList";
import { ImpactBar } from "@/components/ImpactBar";
import { WorkSection } from "@/components/WorkSection";
import { CaptionedImage } from "@/components/CaptionedImage";
import { NextProjectCard } from "@/components/NextProjectCard";
import type { Deliverable } from "@/components/DeliverablesRow";

export async function generateStaticParams() {
  const projects = await reader.collections.projects.all();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await reader.collections.projects.read(slug);
  if (!project) return {};

  const coverImage =
    typeof project.coverImage === "object" && project.coverImage !== null
      ? (project.coverImage as { src: string }).src
      : (project.coverImage as string) ?? "";

  const title = `${project.title} | Branislav Benčík`;
  const description = project.description || `${project.title} case study`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: coverImage
        ? [{ url: coverImage, width: 1288, height: 748, alt: project.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
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

  type ImageEntry = {
    src: string;
    alt: string;
    caption?: string | null;
  };

  return (
    <>
      <main id="main-content">
        <ProjectHeader
          title={project.title}
          isCaseStudy={project.type === "case-study"}
          year={project.year || undefined}
          role={project.role || undefined}
          heroImage={coverImage}
          heroImageAlt={`${project.title} overview`}
          deliverables={
            ((project as { deliverables?: readonly Deliverable[] }).deliverables ?? [])
          }
        />

        {isCaseStudy && (project.contributions.length > 0 || project.impactItems.length > 0) && (
          <>
            {project.contributions.length > 0 && (
              <ContributionList items={project.contributions as string[]} />
            )}
            {project.impactItems.length > 0 && (
              <ImpactBar
                items={(project.impactItems as { value: string; label: string }[]).map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
              />
            )}
          </>
        )}

        {project.sections.map((section, i) => {
          const images = (section.images as unknown as ImageEntry[])
            .filter(img => isCaseStudy || img.src !== coverImage);

          const sectionId = section.title
            ? section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
            : undefined;

          if (section.title) {
            return (
              <WorkSection
                key={i}
                id={sectionId}
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
                  />
                ))}
              </WorkSection>
            );
          }

          // Section without title — flat image gallery (selected projects)
          return (
            <section key={i} className="w-full max-w-frame mx-center px-content-x py-section flex flex-col gap-12">
              {images.map((img, j) => (
                <CaptionedImage
                  key={j}
                  src={img.src}
                  alt={img.alt}
                  caption={img.caption || undefined}
                />
              ))}
            </section>
          );
        })}
      </main>

      <NextProjectCard currentSlug={slug} />
    </>
  );
}
