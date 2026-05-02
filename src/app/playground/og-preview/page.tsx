import { reader } from "@/lib/keystatic";
import { PreviewMatrix } from "./PreviewMatrix";
import type { ProjectData } from "./types";

const SAMPLE_SLUGS = ["skoala", "teatime", "nnspect"];

async function loadProjects(): Promise<ProjectData[]> {
  const entries = await Promise.all(
    SAMPLE_SLUGS.map(async (slug) => {
      const p = await reader.collections.projects.read(slug);
      if (!p) return null;
      const coverImage =
        typeof p.coverImage === "object" && p.coverImage !== null
          ? (p.coverImage as { src: string }).src
          : ((p.coverImage as string | null) ?? "");
      const data: ProjectData = {
        slug,
        title: p.title,
        company: p.company,
        description: p.description,
        tags: p.tags ? [...p.tags] : [],
        role: p.role ?? "",
        year: p.year ?? "",
        coverImage,
      };
      return data;
    })
  );
  return entries.filter((e): e is ProjectData => e !== null);
}

export default async function OgPreviewPage() {
  const projects = await loadProjects();

  return (
    <main>
      <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-secondary mb-3">Design lab</p>
        <h1 className="type-heading text-text-primary mb-4">
          OG image · V1 minimal — parametrized
        </h1>
        <p className="type-body text-text-secondary max-w-column">
          Single OG for all routes. Just name + role + small avatar. Toggle the
          axes above to explore size, position, and avatar placement. Each
          platform card renders at its real-world image-slot width — Slack 540,
          LinkedIn 552, X 600, iMessage 280 — so what you see is what the share
          preview will look like.
        </p>
      </header>

      <PreviewMatrix projects={projects} />
    </main>
  );
}
