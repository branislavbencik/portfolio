"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";

const PIN_THRESHOLD = 52;

export default function Nav() {
  const pathname = usePathname();
  const isDetail = pathname !== "/" && !pathname.startsWith("/keystatic");

  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastScrollRef.current = window.scrollY;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mq.matches;
    if (reducedMotion) return;

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
      className={`animate-nav-in sticky top-0 z-40 w-full bg-canvas max-[1320px]:px-content-x motion-safe:transition-transform motion-safe:duration-[220ms] motion-safe:ease-[cubic-bezier(0.25,1,0.5,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        aria-label="Primary"
        className="w-full max-w-frame mx-center flex items-center justify-between h-13"
      >
        {isDetail ? (
          <Link
            href="/"
            className="link-underline type-nav text-text-primary no-underline inline-flex items-center gap-2"
          >
            <span aria-hidden="true">←</span>
            <span>Back</span>
          </Link>
        ) : (
          <Link
            href="/"
            className="link-underline type-nav text-text-primary no-underline inline-flex items-center"
          >
            Branislav Benčík
          </Link>
        )}
        <div className="flex items-center gap-x-4 type-nav text-text-primary">
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
