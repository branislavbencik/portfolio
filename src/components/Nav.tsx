"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";

// Pin zone — nav stays visible while scrollY is within the first PIN_THRESHOLD px.
// Sized to the nav's own height so that the top of the page has a one-nav-height
// grace zone before hide-on-scroll kicks in. This also prevents a visual artifact
// where the content column's vertical rules appear to not reach the viewport edge
// the moment the user nudges-scrolls and the nav briefly slides away.
// Past the threshold, any downward position change hides; any upward change shows.
// No velocity/jitter filter: behavior is tied to literal pixel direction.
const PIN_THRESHOLD = 52;

export default function Nav() {
  const pathname = usePathname();
  const isDetail = pathname !== "/" && !pathname.startsWith("/keystatic");

  const [hidden, setHidden] = useState(false);
  // Tracks whether the user has scrolled at all. Used to fade in the nav's
  // border-b on case study detail routes (so nav gains a boundary line when
  // content starts flowing under it). Tracked for all users, not gated by
  // reduced-motion — the border is a state indicator, not motion.
  const [scrolled, setScrolled] = useState(false);
  const lastScrollRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;
    setScrolled(window.scrollY > 0);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mq.matches;

    function onScroll() {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const current = window.scrollY;

        // Border state — always tracked, independent of motion preference.
        setScrolled(current > 0);

        // Hide-on-scroll — motion behavior only, respects reduced-motion.
        if (!reducedMotion) {
          const last = lastScrollRef.current;
          const delta = current - last;

          if (current <= PIN_THRESHOLD) {
            setHidden(false);
          } else if (delta > 0) {
            setHidden(true);
          } else if (delta < 0) {
            setHidden(false);
          }
        }

        lastScrollRef.current = current;
        tickingRef.current = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const borderColor = isDetail && scrolled ? "border-surface-2" : "border-transparent";

  return (
    <header
      className={`animate-nav-in sticky top-0 z-40 w-full bg-canvas max-[1320px]:px-content-x motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`w-full max-w-frame mx-center flex items-center justify-between h-13 border-b ${borderColor} motion-safe:transition-colors motion-safe:duration-[220ms] motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)]`}
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
        <div className="flex items-center gap-x-4 type-nav text-text-secondary">
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
