"use client";

import { useState, useEffect, useRef } from "react";

type Keyword = "systems" | "impact" | "outcome";

const KEYWORDS: Keyword[] = ["systems", "impact", "outcome"];

const reveals: Record<Keyword, string> = {
  systems: "Dependencies, flows, edge cases. I see what breaks before it breaks.",
  impact:  "I designed the platform that teaches financial literacy to every 2nd kid in Czechia.",
  outcome: "Strategy. Automation, front-end code, live products. I don't stop at the handoff.",
};

function Kw({
  word,
  active,
  onEnter,
  onLeave,
}: {
  word: Keyword;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <span
      role="button"
      tabIndex={0}
      className={`cursor-default transition-colors duration-300 focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4 ${
        active ? "text-text-primary" : "text-text-tertiary"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onEnter();
        }
      }}
    >
      {word}
    </span>
  );
}

export default function HeroStatement() {
  const [active, setActive] = useState<Keyword>("systems");
  const [visible, setVisible] = useState(true);
  const hoveredRef = useRef<Keyword | null>(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const interval = setInterval(() => {
      if (hoveredRef.current !== null) return;
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % KEYWORDS.length;
        setActive(KEYWORDS[indexRef.current]);
        setVisible(true);
      }, 200);
    }, 2500);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleEnter(word: Keyword) {
    hoveredRef.current = word;
    indexRef.current = KEYWORDS.indexOf(word);
    setVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActive(word);
      setVisible(true);
    }, 150);
  }

  function handleLeave() {
    hoveredRef.current = null;
  }

  return (
    <section className="pt-32 pb-16 relative">
      <div className="max-w-[500px] mx-auto text-center flex flex-col items-center gap-6">
        <h1 className="type-hero text-text-tertiary">
          I think in{" "}
          <Kw word="systems" active={active === "systems"} onEnter={() => handleEnter("systems")} onLeave={handleLeave} />
          {", design for "}
          <Kw word="impact" active={active === "impact"} onEnter={() => handleEnter("impact")} onLeave={handleLeave} />
          {", and own the "}
          <Kw word="outcome" active={active === "outcome"} onEnter={() => handleEnter("outcome")} onLeave={handleLeave} />
          {"."}
        </h1>

        <p
          className={`type-body-m text-text-secondary max-w-[360px] min-h-[3em] transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          {reveals[active]}
        </p>
      </div>

      {/* Border bleeds to full viewport width */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen border-b border-zinc-200" />
    </section>
  );
}
