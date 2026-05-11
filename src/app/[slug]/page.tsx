import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { reader } from "@/lib/keystatic";
import { ProjectHeader } from "@/components/ProjectHeader";
import { ContributionList } from "@/components/ContributionList";
import { ImpactBar } from "@/components/ImpactBar";
import { DeliverablesBar } from "@/components/DeliverablesBar";
import { WorkSection } from "@/components/WorkSection";
import { CaptionedImage } from "@/components/CaptionedImage";
import { LogoRow } from "@/components/LogoRow";
import { AwardList } from "@/components/AwardList";
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

  // Title is just the project title — name is already in the OG image (wordmark)
  // and in the root site title chain. Repeating it here forces iMessage truncation
  // earlier and adds no information.
  //
  // og:image is the same site-wide signature wordmark from app/opengraph-image.tsx.
  // We have to reference it explicitly here because Next's metadata merging replaces
  // (not deep-merges) the openGraph object when a child generateMetadata returns one,
  // so the parent layout's auto-resolved colocated image would otherwise be dropped.
  const title = project.title;
  const description = project.description || `${project.title} case study`;
  const ogImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "Branislav Benčík",
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
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
  type CornerRadius = "sm" | "md";
  type ImageEntry = {
    src: string;
    alt: string;
    caption?: string | null;
    variant?: string | null;
    background: boolean;
    backgroundShade?: string | null;
    paddingSides?: string | null;
    borderSides?: string | null;
    cornerRadius?: string | null;
    width?: number | null;
  };

  // Group adjacent logo-variant images into a single LogoRow block so they
  // render side-by-side instead of stacked inside the section's flex-col.
  type RenderBlock =
    | { kind: "image"; img: ImageEntry }
    | { kind: "logo-row"; logos: ImageEntry[] };
  const groupBlocks = (imgs: ImageEntry[]): RenderBlock[] => {
    const blocks: RenderBlock[] = [];
    let i = 0;
    while (i < imgs.length) {
      if (imgs[i].variant === "logo") {
        const run: ImageEntry[] = [];
        while (i < imgs.length && imgs[i].variant === "logo") {
          run.push(imgs[i]);
          i++;
        }
        blocks.push({ kind: "logo-row", logos: run });
      } else {
        blocks.push({ kind: "image", img: imgs[i] });
        i++;
      }
    }
    return blocks;
  };

  const toPaddingSides = (v?: string | null): PaddingSides | undefined =>
    v === "all" || v === "no-bottom" || v === "top-left" || v === "none" ? v : undefined;
  const toBorderSides = (v?: string | null): BorderSides | undefined =>
    v === "all" || v === "no-bottom" || v === "none" ? v : undefined;
  const toCornerRadius = (v?: string | null): CornerRadius | undefined =>
    v === "sm" || v === "md" ? v : undefined;
  const toBackgroundShade = (v?: string | null): "1" | "white" | undefined =>
    v === "1" || v === "white" ? v : undefined;

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
          company={project.company || undefined}
          year={project.year || undefined}
          tags={project.tags ? [...project.tags] : undefined}
          intro={project.intro || undefined}
          heroImage={coverImage}
          heroImageAlt={`${project.title} overview`}
          coverCaption={coverCaption}
        />

        {isCaseStudy && (
          project.contributions.length > 0 ||
          project.impactItems.length > 0 ||
          project.deliverables.length > 0
        ) && (
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
            {project.deliverables.length > 0 && (
              <DeliverablesBar
                items={project.deliverables.map((d) => ({
                  label: d.label,
                  href: d.href,
                  caption: d.caption || undefined,
                  disabled: d.disabled,
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
                {groupBlocks(images).map((block, j) =>
                  block.kind === "logo-row" ? (
                    <LogoRow key={j} logos={block.logos.map((l) => ({ src: l.src, alt: l.alt }))} />
                  ) : (
                    <CaptionedImage
                      key={j}
                      src={block.img.src}
                      alt={block.img.alt}
                      caption={block.img.caption || undefined}
                      background={block.img.background}
                      backgroundShade={toBackgroundShade(block.img.backgroundShade)}
                      paddingSides={toPaddingSides(block.img.paddingSides)}
                      borderSides={toBorderSides(block.img.borderSides)}
                      cornerRadius={toCornerRadius(block.img.cornerRadius)}
                      width={block.img.width ?? undefined}
                    />
                  )
                )}
                {section.awards && section.awards.length > 0 && (
                  <AwardList
                    items={section.awards.map((a) => ({
                      logo: a.logo || undefined,
                      name: a.name,
                      description: a.description || undefined,
                    }))}
                  />
                )}
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
                    backgroundShade={toBackgroundShade(img.backgroundShade)}
                    paddingSides={toPaddingSides(img.paddingSides)}
                    borderSides={toBorderSides(img.borderSides)}
                    cornerRadius={toCornerRadius(img.cornerRadius)}
                    width={img.width ?? undefined}
                  />
                ))}
              </section>
            </div>
          );
        })}

        {!isCaseStudy && project.deliverables.length > 0 && (
          <div className="pt-detail">
            <DeliverablesBar
              items={project.deliverables.map((d) => ({
                label: d.label,
                href: d.href,
                caption: d.caption || undefined,
                disabled: d.disabled,
              }))}
            />
          </div>
        )}
      </main>

      <NextProjectCard currentSlug={slug} />
    </>
  );
}
