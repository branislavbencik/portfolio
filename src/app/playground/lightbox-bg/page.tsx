import type { Metadata } from "next";
import { reader } from "@/lib/keystatic";
import { LightboxBgClient, type ImageEntry } from "./client";

export const metadata: Metadata = {
  title: "Lightbox bg/border audit",
};

export default async function Page() {
  const projects = await reader.collections.projects.all();
  const usable = projects
    .filter((p) => p.entry.type !== "playground")
    .sort((a, b) => (a.entry.order ?? 99) - (b.entry.order ?? 99));

  const entries: ImageEntry[] = usable.flatMap((p) => {
    const coverSrc =
      typeof p.entry.coverImage === "object" && p.entry.coverImage !== null
        ? (p.entry.coverImage as { src: string }).src
        : ((p.entry.coverImage as string) ?? "");

    const seen = new Set<string>();
    const list: ImageEntry[] = [];

    if (coverSrc) {
      seen.add(coverSrc);
      list.push({
        project: p.slug,
        src: coverSrc,
        label: "cover (hero)",
        defaultBg: true,
        defaultBorder: true,
      });
    }

    type RawImg = {
      src: string;
      alt: string;
      background: boolean;
      borderSides?: string | null;
      paddingSides?: string | null;
    };

    p.entry.sections.forEach((section, si) => {
      (section.images as readonly RawImg[]).forEach((img, ii) => {
        if (seen.has(img.src)) return;
        seen.add(img.src);

        const bg = img.background;
        const borderRaw = img.borderSides;
        const border =
          borderRaw === "all" || borderRaw === "no-bottom"
            ? true
            : borderRaw === "none"
            ? false
            : bg;

        list.push({
          project: p.slug,
          src: img.src,
          label: `section ${si} · img ${ii}`,
          defaultBg: bg,
          defaultBorder: border,
        });
      });
    });

    return list;
  });

  return <LightboxBgClient entries={entries} />;
}
