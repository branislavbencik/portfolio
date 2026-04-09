"use client";

import { useState, useEffect } from "react";

function HeroSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="h-16 w-full bg-surface-1 animate-pulse" />
        <div className="h-16 w-4/5 bg-surface-1 animate-pulse" />
      </div>
      <div className="grid grid-cols-3 max-md:grid-cols-1 border border-surface-2 divide-x max-md:divide-x-0 max-md:divide-y divide-surface-2">
        <div className="h-28 bg-surface-1 animate-pulse" />
        <div className="h-28 bg-surface-1 animate-pulse" />
        <div className="h-28 bg-surface-1 animate-pulse" />
      </div>
    </div>
  );
}

export default function HeroStatement() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="pb-section">
      <div className="max-w-column mx-auto pt-20 max-md:pt-10 pb-10 flex flex-col gap-6 max-md:px-content-x">
        {!mounted ? (
          <HeroSkeleton />
        ) : (
          <div className="animate-hero-content-in flex flex-col gap-6">
            <h1 className="type-display text-text-primary">
              I think in systems, design for impact & own the outcome.
            </h1>

            <div className="grid grid-cols-3 max-md:grid-cols-1">
              {[
                { label: "systems", text: "Dependencies, flows, edge cases. I map the whole problem before I open Figma." },
                { label: "impact", text: "I designed platform that teaches financial literacy to every 2nd kid in Czechia." },
                { label: "outcome", text: "Strategy, Automation, front-end code, live products. I don't stop at the handoff." },
              ].map((box, i) => (
                <div
                  key={box.label}
                  className={`animate-hero-box hero-box-delay-${i} hero-box-text-delay-${i} border border-surface-2 ${i > 0 ? "max-md:border-t-0 border-l-0 max-md:border-l" : ""}`}
                >
                  <div className="px-6 py-6 max-md:px-4 max-md:py-4 flex flex-col gap-2">
                    <p className="animate-hero-box-text type-allcaps text-text-tertiary">{box.label}</p>
                    <p className="animate-hero-box-text type-body-s text-text-secondary leading-snug">{box.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
