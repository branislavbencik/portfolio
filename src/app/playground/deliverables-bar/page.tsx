import { ExternalArrow } from "@/components/icons/ExternalArrow";

type HoverMode =
  | "zinc-300"
  | "zinc-400"
  | "zinc-500"
  | "none"
  | "underline";

const ITEMS = [
  { label: "skoala.cz", href: "https://skoala.cz" },
  {
    label: "Design Sprint Figjam",
    href: "https://www.figma.com/board/1SMhgaQVBxP5Md51IkMenJ/Skoala-%7C-DesignSprint?node-id=0-1",
  },
];

function FauxImpactBar() {
  return (
    <div className="flex border border-surface-2 rounded-sm max-md:flex-col">
      {[
        { value: "3,5K", label: "Czech schools" },
        { value: "11K", label: "teachers" },
        { value: "140", label: "lesson plans" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex flex-col gap-1.5 flex-1 px-8 py-8 max-md:px-4 max-md:py-5 max-md:border-t max-md:border-surface-2 max-md:first:border-t-0"
        >
          <span className="type-stat text-text-primary">{item.value}</span>
          <span className="type-caption text-text-primary">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function hoverClasses(mode: HoverMode): string {
  const transition =
    "motion-safe:transition-colors motion-safe:duration-[200ms] motion-safe:ease-out";
  switch (mode) {
    case "zinc-300":
      return `${transition} hover:border-[var(--border-strong)]`;
    case "zinc-400":
      return `${transition} hover:border-[var(--border-light-hover)]`;
    case "zinc-500":
      return `${transition} hover:border-[var(--text-tertiary)]`;
    case "none":
      return "";
    case "underline":
      return "";
  }
}

function VariantBars({ mode }: { mode: HoverMode }) {
  const labelClass =
    mode === "underline"
      ? "type-label text-text-primary truncate group-hover:underline decoration-1 underline-offset-4 decoration-[var(--text-primary)]"
      : "type-label text-text-primary truncate";

  return (
    <div className="flex flex-col gap-2">
      {ITEMS.map((item, i) => (
        <a
          key={i}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-inset ${hoverClasses(
            mode
          )}`}
        >
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className={labelClass}>{item.label}</span>
          </span>
          <ExternalArrow
            size={14}
            className="shrink-0 text-text-primary motion-safe:transition-transform motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          />
        </a>
      ))}
    </div>
  );
}

interface VariantSection {
  id: string;
  title: string;
  meta: string;
  mode: HoverMode;
  recommended?: boolean;
}

const VARIANTS: VariantSection[] = [
  {
    id: "a",
    title: "A — Current (shipped)",
    meta: "rest: Zinc 200 · hover: Zinc 300 (--border-strong) · ~7-point delta",
    mode: "zinc-300",
  },
  {
    id: "b",
    title: "B — Zinc 400 (proposed)",
    meta: "rest: Zinc 200 · hover: Zinc 400 (--border-light-hover, shipped) · ~27-point delta",
    mode: "zinc-400",
    recommended: true,
  },
  {
    id: "c",
    title: "C — Zinc 500 (text-tertiary)",
    meta: "rest: Zinc 200 · hover: Zinc 500 (--text-tertiary) · ~45-point delta · cross-tier (text token on border)",
    mode: "zinc-500",
  },
  {
    id: "e",
    title: "E — No border darken",
    meta: "rest: Zinc 200 · hover: same · arrow translates 2px up-right · transform-only per memory rule",
    mode: "none",
  },
  {
    id: "g",
    title: "G — Underline on label (instant preview)",
    meta: "rest: Zinc 200 · hover: same · label underline appears on group-hover · production would use the .link-underline 320ms scaleX pattern, not instant",
    mode: "underline",
  },
];

export default function DeliverablesBarPlayground() {
  return (
    <main className="w-full max-w-frame mx-center max-lg:px-content-x py-section">
      <div className="max-w-column mx-auto w-full">
        <header className="mb-12">
          <p className="type-allcaps text-text-secondary mb-3">Playground</p>
          <h1 className="type-page-title text-text-primary mb-4">
            DeliverablesBar — hover intensity
          </h1>
          <p className="type-body text-text-primary">
            Each variant renders the production layout (faux ImpactBar above,
            separated DeliverablesBar tiles below at 16px gap, 8px between bars).
            Only the hover treatment differs. Hover each bar to feel the
            intensity. Tab into a bar to test the focus ring (independent of
            hover treatment).
          </p>
        </header>
        <div className="flex flex-col">
          {VARIANTS.map((v) => (
            <section
              key={v.id}
              id={v.id}
              className="border-t border-surface-2 pt-8 pb-12"
            >
              <div className="mb-4">
                <h3 className="type-label text-text-primary font-semibold">
                  {v.title}
                  {v.recommended && (
                    <span className="ml-2 type-caption font-mono text-accent-live align-middle">
                      ← recommended
                    </span>
                  )}
                </h3>
                <p className="type-caption text-text-secondary mt-1 font-mono">
                  {v.meta}
                </p>
              </div>
              <FauxImpactBar />
              <div className="pt-4">
                <VariantBars mode={v.mode} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
