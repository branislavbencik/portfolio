"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Pin zone — nav stays visible while scrollY is within the first PIN_THRESHOLD px.
// Past that, we listen to scroll direction with DELTA as a jitter filter.
const PIN_THRESHOLD = 8;
const DELTA = 4;

function ExternalArrow() {
  return (
    <svg
      aria-hidden="true"
      className="inline-block ml-1 align-[-0.125em]"
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

  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    lastScrollRef.current = window.scrollY;

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;
        const last = lastScrollRef.current;
        const delta = current - last;

        if (current <= PIN_THRESHOLD) {
          setHidden(false);
        } else if (delta > DELTA) {
          setHidden(true);
        } else if (delta < -DELTA) {
          setHidden(false);
        }

        lastScrollRef.current = current;
        tickingRef.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`animate-nav-in sticky top-0 z-40 w-full bg-canvas border-b border-surface-2 max-[1320px]:px-content-x motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="w-full max-w-frame mx-center flex items-center justify-between h-16"
      >
        {isDetail ? (
          <Link
            href="/"
            className="link-underline type-link text-text-secondary hover:text-foreground no-underline inline-flex items-center gap-2"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="link-underline type-link text-text-secondary hover:text-foreground no-underline inline-flex items-center"
          >
            Branislav Benčík
          </Link>
        )}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline type-link text-text-secondary hover:text-foreground no-underline inline-flex items-center"
          aria-label="Resume (opens in new tab)"
        >
          Resume
          <ExternalArrow />
        </a>
      </nav>
    </header>
  );
}
