"use client";

import { useRef, useEffect, useCallback } from "react";

const LABEL = "Curiouser and curiouser!";
const RADIUS = 100;
const FROM_WEIGHT = 300;
const TO_WEIGHT = 800;

/**
 * Variable-font cursor proximity effect.
 * Each letter responds to cursor distance by interpolating font-weight.
 * Uses refs exclusively — no state, no re-renders.
 */
export default function CuriouserText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

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
      // Gaussian falloff
      const t = dist < RADIUS ? Math.exp(-((dist * dist) / (2 * (RADIUS / 2.5) ** 2))) : 0;
      const weight = FROM_WEIGHT + t * (TO_WEIGHT - FROM_WEIGHT);

      span.style.fontVariationSettings = `"wght" ${Math.round(weight)}`;
    }

    rafRef.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    // Respect reduced motion
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

  return (
    <div
      ref={containerRef}
      aria-label={LABEL}
      className="w-full flex justify-center py-6 select-none"
    >
      <p className="type-body-s text-text-tertiary tracking-wide">
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
  );
}
