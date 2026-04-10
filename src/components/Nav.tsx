"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="inline-block ml-1 align-[0.05em]"
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      <line x1="5" y1="15" x2="15" y2="5" />
      <polyline points="7,5 15,5 15,13" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const isDetail = pathname !== "/" && !pathname.startsWith("/keystatic");

  return (
    <header className="animate-nav-in sticky top-0 z-40 w-full border-b border-surface-2 bg-canvas">
      <nav aria-label="Primary" className="w-full max-w-frame mx-center flex items-center justify-between max-[1320px]:px-content-x py-5 h-16">
        {isDetail ? (
          <Link
            href="/#work"
            className="link-underline type-body-m text-text-secondary hover:text-foreground no-underline inline-flex items-center gap-2 py-2.5"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="link-underline type-body-m text-text-secondary hover:text-foreground no-underline inline-flex items-center py-2.5"
          >
            Branislav Benčík
          </Link>
        )}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline type-body-m text-text-secondary hover:text-foreground no-underline inline-flex items-center py-2.5"
          aria-label="Resume (opens in new tab)"
        >
          Resume
          <ExternalArrow />
        </a>
      </nav>
    </header>
  );
}
