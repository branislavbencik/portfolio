"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const LABEL = "Curiouser and curiouser!";
const RADIUS = 100;
const FROM_WEIGHT = 300;
const TO_WEIGHT = 800;

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
  const update = useCallback(() => {
    const { x: mx, y: my } = mouseRef.current;
    const spans = spanRefs.current;

    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      if (!span) continue;

      const rect = span.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const t = dist < RADIUS ? Math.exp(-((dist * dist) / (2 * (RADIUS / 2.5) ** 2))) : 0;
      const weight = FROM_WEIGHT + t * (TO_WEIGHT - FROM_WEIGHT);

      span.style.fontVariationSettings = `"wght" ${Math.round(weight)}`;
    }

    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
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
    <footer className="w-full max-[1320]:px-content-x ">
      <div
        ref={containerRef}
        className="max-w-frame mx-auto py-5 flex items-center justify-between max-md:flex-col max-md:gap-4"
      >
        {/* Left: contact links */}
        <div className="flex items-center gap-3 type-body-s text-text-secondary">
          <button
            onClick={handleEmailClick}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
            className="hover:text-foreground motion-safe:transition-colors cursor-pointer"
          >
            {copied ? "Copied!" : "branislav.bencik@gmail.com"}
          </button>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href="https://www.linkedin.com/in/branislavbencik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground motion-safe:transition-colors"
            aria-label="LinkedIn (opens in new tab)"
          >
            LinkedIn
          </a>
          <span aria-hidden="true" className="opacity-40">·</span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground motion-safe:transition-colors"
            aria-label="Resume (opens in new tab)"
          >
            Resume
          </a>
        </div>

        {/* Right: Curiouser text with variable-weight effect */}
        <p
          className="type-body-s text-text-secondary tracking-wide select-none"
          aria-label={LABEL}
        >
          {LABEL.split("").map((char, i) => (
            <span
              key={i}
              ref={(el) => { spanRefs.current[i] = el; }}
              style={{ fontVariationSettings: `"wght" ${FROM_WEIGHT}` }}
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
