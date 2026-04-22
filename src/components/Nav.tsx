"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";

// Pin zone — nav stays visible while scrollY is within the first PIN_THRESHOLD px.
// Sized to the nav's own height so that the top of the page has a one-nav-height
// grace zone before hide-on-scroll kicks in.
// Past the threshold, any downward position change hides; any upward change shows.
// No velocity/jitter filter: behavior is tied to literal pixel direction.
const PIN_THRESHOLD = 52;

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
        } else if (delta > 0) {
          setHidden(true);
        } else if (delta < 0) {
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
      className={`animate-nav-in sticky top-0 z-40 w-full bg-canvas motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="w-full max-w-frame mx-center max-lg:px-content-x flex items-center justify-between h-13"
      >
        {isDetail ? (
          <Link
            href="/"
            className="link-underline type-nav text-text-secondary hover:text-foreground no-underline inline-flex items-center gap-2"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="link-underline type-nav text-text-secondary hover:text-foreground no-underline inline-flex items-center"
          >
            Branislav Benčík
          </Link>
        )}
        <div className="flex items-center gap-x-3 type-nav text-text-secondary">
          <a
            href="https://github.com/branislavbencik/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground no-underline inline-flex items-center"
            aria-label="GitHub (opens in new tab)"
          >
            GitHub
            <ExternalArrow />
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground no-underline inline-flex items-center"
            aria-label="Resume (opens in new tab)"
          >
            Resume
            <ExternalArrow />
          </a>
        </div>
      </nav>
    </header>
  );
}
