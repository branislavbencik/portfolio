"use client";

interface CitationLinkProps {
  label: string;
  href: string;
  external?: boolean;
  previewSrc?: string;
  previewCaption?: string;
  // When true, chip renders with no live href (click is no-op) and the
  // hover card shows the locked preview overlay (NDA + lock badge).
  // Chip's visual styling stays identical to active — the locked state
  // lives entirely in the hover card. See HoverPreview.tsx.
  disabled?: boolean;
  lockedPreviewSrc?: string;
  lockedPreviewCaption?: string;
}

export default function CitationLink({
  label,
  href,
  external,
  previewSrc,
  previewCaption,
  disabled,
  lockedPreviewSrc,
  lockedPreviewCaption,
}: CitationLinkProps) {
  if (disabled) {
    return (
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="chip-link chip-color-blue link-underline chip-locked"
        {...(lockedPreviewSrc
          ? { "data-locked-preview-src": lockedPreviewSrc }
          : {})}
        {...(lockedPreviewCaption
          ? { "data-locked-preview-caption": lockedPreviewCaption }
          : {})}
        aria-label={`${label} — link gated under NDA`}
      >
        {label}
        <span className="chip-arrow" aria-hidden="true">↗</span>
      </a>
    );
  }
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
