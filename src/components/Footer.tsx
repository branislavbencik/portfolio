"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  function handleEmailClick() {
    navigator.clipboard.writeText("branislav.bencik@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <footer className="w-full border-y border-zinc-200">
      <div className="w-full max-w-frame mx-center px-content-x h-16 flex items-center justify-between max-md:h-auto max-md:py-4 max-md:flex-col max-md:items-start max-md:gap-2">
        <div className="flex items-center gap-3 type-body-s text-foreground-secondary max-md:flex-col max-md:items-start">
          <span className="relative">
            <button
              onClick={handleEmailClick}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              branislav.bencik@gmail.com
            </button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background type-body-s px-2 py-1 rounded-none whitespace-nowrap"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <span className="max-md:hidden" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/branislavbencik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            LinkedIn
          </a>
          <span className="max-md:hidden" aria-hidden="true">·</span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Resumé
          </a>
        </div>
        <p className="type-body-s text-foreground-tertiary max-md:mt-12">
          Proudly vibecoded with Claude Code
        </p>
      </div>
    </footer>
  );
}
