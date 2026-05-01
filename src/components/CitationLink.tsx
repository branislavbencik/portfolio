interface CitationLinkProps {
  label: string;
  href: string;
  external?: boolean;
  previewSrc?: string;
  previewCaption?: string;
}

export default function CitationLink({
  label,
  href,
  external,
  previewSrc,
  previewCaption,
}: CitationLinkProps) {
  return (
    <a
      href={href}
      className="chip-link chip-color-blue link-underline"
      {...(previewSrc ? { "data-hover-preview-src": previewSrc } : {})}
      {...(previewCaption ? { "data-hover-preview-caption": previewCaption } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      <span className="chip-arrow" aria-hidden="true">↗</span>
    </a>
  );
}
