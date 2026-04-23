"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";

const LABEL = "Curiouser and curiouser!";
const RADIUS = 100;
const FROM_WEIGHT = 300;
const TO_WEIGHT = 800;

// Footer arrow is one pixel smaller than Nav's (12 vs 14) — ExternalArrow takes a size prop for this.
const FOOTER_ARROW_SIZE = 12;

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Curiouser variable-weight refs
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  // Variable-weight cursor proximity effect
  const runningRef = useRef(false);
  const atRestCountRef = useRef(0);

  const update = useCallback(() => {
    const { x: mx, y: my } = mouseRef.current;
    const spans = spanRefs.current;
    let allAtRest = true;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span) continue;

      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const t = dist < RADIUS ? Math.exp(-((dist * dist) / (2 * (RADIUS / 2.5) ** 2))) : 0;
      const weight = Math.round(FROM_WEIGHT + t * (TO_WEIGHT - FROM_WEIGHT));

      if (weight !== FROM_WEIGHT) allAtRest = false;
      span.style.fontVariationSettings = `"wght" ${weight}`;
    }

    // When all characters are back at the resting weight, park for a few frames
    // then stop the RAF loop until the next mousemove re-starts it.
    if (allAtRest) {
      atRestCountRef.current += 1;
      if (atRestCountRef.current > 10) {
        runningRef.current = false;
        rafRef.current = 0;
        return;
      }
    } else {
      atRestCountRef.current = 0;
    }

    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const container = containerRef.current;
    if (!container) return;

    let visible = false;

    const startIfNeeded = () => {
      if (!visible || runningRef.current) return;
      runningRef.current = true;
      atRestCountRef.current = 0;
      rafRef.current = requestAnimationFrame(update);
    };

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      runningRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      startIfNeeded();
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (!visible) stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      io.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      stop();
    };
  }, [update]);

  function handleEmailClick() {
    navigator.clipboard.writeText("branislav.bencik@gmail.com").then(() => {
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <footer className="w-full max-[1320px]:px-content-x">
      <div
        ref={containerRef}
        className="w-full max-w-frame mx-center flex items-center justify-between h-13 max-md:flex-col max-md:items-start max-md:h-auto max-md:py-5 max-md:gap-3"
      >
        {/* Left: email */}
        <div className="flex items-center type-nav text-text-secondary">
          <button
            onClick={handleEmailClick}
            aria-label="Copy email address"
            className="link-underline hover:text-foreground cursor-pointer inline-flex items-center relative"
          >
            branislav.bencik@gmail.com
            <span
              aria-live="polite"
              className={`pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+8px)] bg-text-primary text-text-inverse type-allcaps px-2 py-1 whitespace-nowrap motion-safe:transition-opacity duration-150 ease-out ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              {copied ? "Copied" : ""}
            </span>
          </button>
        </div>

        {/* Right: external links */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-2 type-nav text-text-secondary">
          <a
            href="https://github.com/branislavbencik/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground inline-flex items-center"
            aria-label="GitHub (opens in new tab)"
          >
            GitHub
            <ExternalArrow size={FOOTER_ARROW_SIZE} />
          </a>
          <a
            href="https://www.linkedin.com/in/branislavbencik/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground inline-flex items-center"
            aria-label="LinkedIn (opens in new tab)"
          >
            LinkedIn
            <ExternalArrow size={FOOTER_ARROW_SIZE} />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline hover:text-foreground inline-flex items-center"
            aria-label="Resume (opens in new tab)"
          >
            Resume
            <ExternalArrow size={FOOTER_ARROW_SIZE} />
          </a>
        </div>

        {/* Curiouser text — hidden for now, kept for future use */}
        <p
          className="hidden type-nav text-text-secondary tracking-wide select-none"
          aria-label={LABEL}
        >
          {LABEL.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { spanRefs.current[i] = el; }}
              style={{ fontVariationSettings: `"wght" ${FROM_WEIGHT}` }} // audit-ignore: dynamic variable-font weight driven by RAF loop
              className="inline-block transition-none"
              aria-hidden="true"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
