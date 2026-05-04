import CitationLink from "@/components/CitationLink";

const SERVICE_DESIGN = {
  href: "https://www.figma.com/board/u3gtseQ4wvLMcpNUy4UWWP/Teatime-procesy?node-id=2034-7737",
  chipLabel: "Service design",
  description: "Service design of the learning system",
};
const N8N = {
  href: "https://share-n8n.com/shared/888fkQf1zCAc",
  chipLabel: "n8n",
  description: "n8n workflow for speech evaluation",
};
const SCHNEIDER = {
  href: "https://www.figma.com/proto/OosDm8xoUEJolO4lzpfcVC/Schneider-Electric-%7C-Design-Sprint--version-241010---Copy-?node-id=28343-3731&viewport=5034%2C-559%2C0.09&t=ZIff6YC9W14ngFdk-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=28343%3A3731&show-proto-sidebar=1&page-id=28260%3A4",
  chipLabel: "Schneider",
  description: "Configurator for Electrical Panels",
};
const SIDEPROJECT = {
  href: "https://reprio.vercel.app/",
  chipLabel: "Sideproject",
  description: "Chat with AI to prioritize tasks",
};
const SKOALA = {
  href: "https://www.figma.com/design/ElwxrYVb8YgqCfU1P6aIWE/Skoala-%7C-Teacher-Platform-Beta--Copy-?node-id=15633-97847&t=eetrjMXtBwq4OG2Q-1",
  chipLabel: "Skoala",
  description: "Slides as parametrized CMS components",
};

const PREVIEW = {
  serviceDesign: "/images/hero-previews/service-design.png",
  n8n: "/images/hero-previews/n8n.png",
  schneider: "/images/hero-previews/schneider.png",
  reprio: "/images/hero-previews/reprio.png",
  skoala: "/images/hero-previews/skoala.svg",
};

export type TextColor = "primary" | "secondary" | "tertiary";
export type LinkColor = "primary" | "secondary" | "tertiary" | "blue";
export type Underline = "on" | "off";

const CHIP_COLOR_CLASS: Record<LinkColor, string> = {
  primary: "chip-color-primary",
  secondary: "chip-color-secondary",
  tertiary: "chip-color-tertiary",
  blue: "chip-color-blue",
};
const TEXT_PROSE_CLASS: Record<TextColor, string> = {
  primary: "text-prose-primary",
  secondary: "text-prose-secondary",
  tertiary: "text-prose-tertiary",
};

function chipClassName(linkColor: LinkColor, underline: Underline): string {
  const parts = ["chip-link", CHIP_COLOR_CLASS[linkColor]];
  if (underline === "on") parts.push("chip-underline");
  return parts.join(" ");
}

function ChipLink({
  href,
  label,
  className,
  previewSrc,
  previewCaption,
}: {
  href: string;
  label: string;
  className: string;
  previewSrc: string;
  previewCaption: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-hover-preview-src={previewSrc}
      data-hover-preview-caption={previewCaption}
    >
      {label}
    </a>
  );
}

export function LedePlayground({
  textColor,
  linkColor,
  underline,
}: {
  textColor: TextColor;
  linkColor: LinkColor;
  underline: Underline;
}) {
  const cls = chipClassName(linkColor, underline);
  const proseClass = TEXT_PROSE_CLASS[textColor];
  return (
    <p className={`type-lede max-w-lede ${proseClass}`}>
      I tend to be useful anywhere from mapping{" "}
      <ChipLink href={SERVICE_DESIGN.href} label="systems" className={cls} previewSrc={PREVIEW.serviceDesign} previewCaption={SERVICE_DESIGN.description} />, through shipping{" "}
      <ChipLink href={N8N.href} label="automations" className={cls} previewSrc={PREVIEW.n8n} previewCaption={N8N.description} />,{" "}
      <ChipLink href={SCHNEIDER.href} label="prototypes" className={cls} previewSrc={PREVIEW.schneider} previewCaption={SCHNEIDER.description} />, and{" "}
      <ChipLink href={SIDEPROJECT.href} label="code" className={cls} previewSrc={PREVIEW.reprio} previewCaption={SIDEPROJECT.description} />. Often, I&apos;ll go all the way down the rabbit hole to map{" "}
      <ChipLink href={SKOALA.href} label="states" className={cls} previewSrc={PREVIEW.skoala} previewCaption={SKOALA.description} /> and exceptions.
    </p>
  );
}

// Reference variant — historically the V1 superscript chip pattern. After
// CitationLink was refactored (2026-05-01) to the chip-link/hover-preview
// pattern (combo C ported to live), this renders identically to the
// LedePlayground default — kept around so the playground compiles; safe
// to delete with the broader playground cleanup PR.
export function LedeV1Status() {
  return (
    <p className="type-lede text-text-primary max-w-lede">
      I tend to be useful anywhere from mapping systems
      <CitationLink label={SERVICE_DESIGN.chipLabel} href={SERVICE_DESIGN.href} external previewSrc={PREVIEW.serviceDesign} previewCaption={SERVICE_DESIGN.description} />, through shipping automations
      <CitationLink label={N8N.chipLabel} href={N8N.href} external previewSrc={PREVIEW.n8n} previewCaption={N8N.description} />, prototypes
      <CitationLink label={SCHNEIDER.chipLabel} href={SCHNEIDER.href} external previewSrc={PREVIEW.schneider} previewCaption={SCHNEIDER.description} />, and code
      <CitationLink label={SIDEPROJECT.chipLabel} href={SIDEPROJECT.href} external previewSrc={PREVIEW.reprio} previewCaption={SIDEPROJECT.description} />. Often, I&apos;ll go all the way down the rabbit hole to map states
      <CitationLink label={SKOALA.chipLabel} href={SKOALA.href} external previewSrc={PREVIEW.skoala} previewCaption={SKOALA.description} /> and exceptions.
    </p>
  );
}
