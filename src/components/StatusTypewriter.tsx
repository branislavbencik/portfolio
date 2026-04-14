"use client";

import { useEffect, useRef } from "react";
import { GeistPixelSquare } from "geist/font/pixel";

const LINE = "20+ APPS DESIGNED | AI-NATIVE";
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*<>/\\|01";
const TICK_MS = 30;

export function StatusTypewriter() {
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const target = LINE.split("");
    const spans = spansRef.current;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: write the final line immediately. No scramble.
    if (reducedMotion) {
      spans.forEach((span, i) => {
        if (span) span.textContent = target[i] === " " ? "\u00A0" : target[i];
      });
      return;
    }

    // Spaces stay locked to their real character so the line shape stays
    // intact while the rest of the chars decode.
    const isStructural = (c: string) => c === " ";
    const locked = target.map(isStructural);
    const current = target.map((c) =>
      isStructural(c)
        ? c
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    );

    let lockIndex = 0;
    while (lockIndex < target.length && locked[lockIndex]) lockIndex++;

    const paint = () => {
      for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        if (!span) continue;
        const glyph = locked[i] ? target[i] : current[i];
        span.textContent = glyph === " " ? "\u00A0" : glyph;
      }
    };

    paint();

    const interval = window.setInterval(() => {
      for (let i = 0; i < current.length; i++) {
        if (!locked[i]) {
          current[i] =
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }

      if (lockIndex < target.length) {
        locked[lockIndex] = true;
        lockIndex++;
        while (lockIndex < target.length && locked[lockIndex]) lockIndex++;
      } else {
        window.clearInterval(interval);
      }

      paint();
    }, TICK_MS);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span role="status" aria-live="off" className="inline-flex items-center">
      <span className="sr-only">
        Over 20 apps shipped. AI-native.
      </span>
      <span
        aria-hidden="true"
        className={`${GeistPixelSquare.className} type-status text-text-primary relative inline-block whitespace-nowrap`}
      >
        {/* Width reservation — invisible copy of the final line keeps layout stable from first paint */}
        <span className="invisible">{LINE}</span>

        {/* Animated overlay — same dimensions, absolutely positioned over the reservation */}
        <span className="absolute inset-0 flex items-center">
          {LINE.split("").map((_, i) => (
            <span
              key={i}
              ref={(el) => {
                spansRef.current[i] = el;
              }}
            />
          ))}
        </span>
      </span>
    </span>
  );
}
