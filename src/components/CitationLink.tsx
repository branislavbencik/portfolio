interface CitationLinkProps {
  label: string;
  href: string;
  external?: boolean;
  cursorLabel?: string;
}

export default function CitationLink({ label, href, external, cursorLabel }: CitationLinkProps) {
  return (
    <sup className="citation-sup">
      <a
        href={href}
        className="citation"
        data-cursor-label={cursorLabel ?? ""}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
        <span className="citation-arrow" aria-hidden="true">↗</span>
      </a>
    </sup>
  );
}
