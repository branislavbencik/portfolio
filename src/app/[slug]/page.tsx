import type { Metadata } from "next";
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
  // Playground entries live only on the landing page and link to the live
  // product externally. No detail page is built for them.
  return projects
    .filter((p) => p.entry.type !== "playground")
    .map((p) => ({ slug: p.slug }));
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
  // Playground entries don't have detail pages — only landing-page cards
  // that link out to the live product.
  if (project.type === "playground") notFound();

  const isCaseStudy = project.type === "case-study";

  const coverImage =
    typeof project.coverImage === "object" && project.coverImage !== null
      ? (project.coverImage as { src: string }).src
      : (project.coverImage as string) ?? "";

  type PaddingSides = "all" | "no-bottom" | "top-left" | "none";
  type BorderSides = "all" | "no-bottom" | "none";
  type ImageEntry = {
    src: string;
    alt: string;
    caption?: string | null;
    background: boolean;
    paddingSides?: string | null;
    borderSides?: string | null;
    width?: number | null;
  };

  const toPaddingSides = (v?: string | null): PaddingSides | undefined =>
    v === "all" || v === "no-bottom" || v === "top-left" || v === "none" ? v : undefined;
  const toBorderSides = (v?: string | null): BorderSides | undefined =>
    v === "all" || v === "no-bottom" || v === "none" ? v : undefined;

  // Selected projects duplicate the cover image as their first section image to attach
  // a caption that ProjectHeader didn't previously render. The image gets filtered out
  // of the gallery below; surface its caption on the hero.
  const coverCaption = !isCaseStudy
    ? project.sections
        .flatMap((s) => s.images as unknown as ImageEntry[])
        .find((img) => img.src === coverImage)?.caption || undefined
    : undefined;

  return (
    <>
      <main id="main-content">
        <ProjectHeader
          title={project.title}
          year={project.year || undefined}
          tags={project.tags ? [...project.tags] : undefined}
          intro={project.intro || undefined}
          heroImage={coverImage}
          heroImageAlt={`${project.title} overview`}
          coverCaption={coverCaption}
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
                tight={project.contributions.length > 0}
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
                    background={img.background}
                    paddingSides={toPaddingSides(img.paddingSides)}
                    borderSides={toBorderSides(img.borderSides)}
                    width={img.width ?? undefined}
                  />
                ))}
              </WorkSection>
            );
          }

          // Section without title — flat image gallery (selected projects)
          return (
            <div key={i} className="w-full">
              <section className="w-full max-w-frame mx-center max-lg:px-content-x pt-detail flex flex-col gap-24">
                {images.map((img, j) => (
                  <CaptionedImage
                    key={j}
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption || undefined}
                    background={img.background}
                    paddingSides={toPaddingSides(img.paddingSides)}
                    borderSides={toBorderSides(img.borderSides)}
                    width={img.width ?? undefined}
                  />
                ))}
              </section>
            </div>
          );
        })}
      </main>

      <NextProjectCard currentSlug={slug} />
    </>
  );
}
