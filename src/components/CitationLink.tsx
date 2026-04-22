interface CitationLinkProps {
  label: string;
  href: string;
  external?: boolean;
}

export default function CitationLink({ label, href, external }: CitationLinkProps) {
  return (
    <sup className="citation-sup">
      <a
        href={href}
        className="citation"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        ({label}
        <span className="citation-arrow" aria-hidden="true">↗</span>)
      </a>
    </sup>
  );
}
