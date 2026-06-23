// Reprio build-notes "Learnings". Rich inline content (file/command code tokens
// + links) that the structured Keystatic schema can't express, so it lives here
// as typed spans. If a second playground project needs learnings, lift the
// content out to a per-slug data module.

type Span =
  | string
  | { code: string }
  | { link: string; href: string };

const BULLETS: Span[][] = [
  [
    "A good starting point for a greenfield design system is just taking ",
    { code: "DESIGN.md" },
    " from ",
    { link: "getdesign.md", href: "https://getdesign.md/" },
    ".",
  ],
  [
    { link: "impeccable.style", href: "https://impeccable.style/" },
    " was the real workhorse. Its workflow is built around MDs and has skills to cover the whole design process. You can define positioning in ",
    { code: "PRODUCT.md" },
    ", run a new feature-discovery session with ",
    { code: "/shape" },
    ", and when finished run ",
    { code: "/critique" },
    " to scan for anti-references and evaluate against ",
    {
      link: "Nielsen's 10 usability heuristics",
      href: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    },
    ".",
  ],
  [
    "A good ",
    { code: "/ship" },
    " does more than ship code. It re-checks the work against MDs, catches drift, and becomes a natural checkpoint for self-improvement.",
  ],
];

function renderSpan(span: Span, i: number) {
  if (typeof span === "string") return <span key={i}>{span}</span>;
  if ("code" in span)
    return (
      <code key={i} className="inline-code">
        {span.code}
      </code>
    );
  return (
    <a
      key={i}
      href={span.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-citation-link underline underline-offset-2 motion-safe:transition-colors hover:text-citation-link-hover"
    >
      {span.link}
    </a>
  );
}

export function Learnings() {
  return (
    <section className="w-full max-w-frame mx-center max-lg:px-content-x pt-detail">
      <div className="max-w-column mx-auto w-full">
        <h2 className="type-heading text-text-primary mb-5">Learnings</h2>
        <ul className="type-body text-text-primary list-disc pl-[1.25em] flex flex-col gap-4 marker:text-text-secondary">
          {BULLETS.map((bullet, i) => (
            <li key={i}>{bullet.map(renderSpan)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
