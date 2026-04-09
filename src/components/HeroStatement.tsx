"use client";

import { useState, useEffect } from "react";

function HeroSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <div className="h-16 w-full bg-surface-1 animate-pulse" />
        <div className="h-16 w-4/5 bg-surface-1 animate-pulse" />
      </div>
      <div className="grid grid-cols-3 border border-surface-2 divide-x divide-surface-2">
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
    <section className="relative overflow-hidden pb-section">
      {/* Animated dot grid background */}
      <div className="hero-dot-grid absolute inset-0 pointer-events-none z-0" aria-hidden="true" />
      {/* Fade grid to white at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-canvas to-transparent pointer-events-none z-[1]" aria-hidden="true" />

      <div className="relative z-10 max-w-column mx-auto pt-20 pb-10 flex flex-col gap-6 max-md:px-content-x">
        {!mounted ? (
          <HeroSkeleton />
        ) : (
          <div className="animate-hero-content-in flex flex-col gap-6">
            <h1 className="type-display text-text-primary">
              I think in systems, design for impact, & own the outcome.
            </h1>

            <div className="grid grid-cols-3 max-md:grid-cols-1 border border-surface-2 divide-x max-md:divide-x-0 max-md:divide-y divide-surface-2">
              <div className="px-6 py-6 flex flex-col gap-2">
                <p className="type-allcaps text-text-tertiary">systems</p>
                <p className="type-body-s text-text-secondary leading-snug">Dependencies, flows, edge cases. I map the whole problem before I open Figma.</p>
              </div>
              <div className="px-6 py-6 flex flex-col gap-2">
                <p className="type-allcaps text-text-tertiary">impact</p>
                <p className="type-body-s text-text-secondary leading-snug">50% of Czech schools use a CMS I designed. An outreach pipeline I built added 0.4M CZK MRR.</p>
              </div>
              <div className="px-6 py-6 flex flex-col gap-2">
                <p className="type-allcaps text-text-tertiary">outcome</p>
                <p className="type-body-s text-text-secondary leading-snug">Strategy, Automation, front-end code, live products. I don't stop at the handoff.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
