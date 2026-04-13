"use client";

import { useEffect, useRef, useState } from "react";
import { GeistPixelSquare } from "geist/font/pixel";

const LINE = "PRAGUE | REMOTE FRIENDLY |\nOPEN TO NEW ROLES";
const TYPE_MS = 60;
const START_DELAY_MS = 220;

export function StatusTypewriter() {
  const [text, setText] = useState("");
  const timeoutRef = useRef<number | null>(null);
  const done = text.length === LINE.length;

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      if (text !== LINE) setText(LINE);
      return;
    }

    if (text.length < LINE.length) {
      const delay = text.length === 0 ? START_DELAY_MS : TYPE_MS;
      timeoutRef.current = window.setTimeout(() => {
        setText(LINE.slice(0, text.length + 1));
      }, delay);
    }

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text]);

  return (
    <span role="status" aria-live="off" className="inline-flex items-center">
      <span className="sr-only">
        Availability: Prague, remote friendly, open to new roles.
      </span>
      <span
        aria-hidden="true"
        className={`${GeistPixelSquare.className} type-status text-text-primary relative inline-block whitespace-nowrap max-md:whitespace-pre-line`}
      >
        <span className="invisible">{LINE}</span>
        <span className="absolute inset-0 items-center">
          {text}
          <span
            key={done ? "cursor-parked" : "cursor-typing"}
            className={`status-cursor ${done ? "animate-cursor-blink" : ""}`}
          />
        </span>
      </span>
    </span>
  );
}
