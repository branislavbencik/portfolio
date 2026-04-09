"use client";

import { useState, useRef, useEffect } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleEmailClick() {
    navigator.clipboard.writeText("branislav.bencik@gmail.com").then(() => {
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <footer className="w-full">
      <div className="w-full px-content-x py-5 flex items-center justify-between border-b border-surface-2 max-md:flex-col max-md:items-start max-md:gap-3">
        {/* Left: email + links */}
        <div className="flex items-center gap-3 type-body-s text-text-secondary">
          <button
            onClick={handleEmailClick}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
            className="hover:opacity-60 transition-opacity cursor-pointer"
          >
            {copied ? "Copied!" : "branislav.bencik@gmail.com"}
          </button>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/branislavbencik/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity"
          >
            Resume
          </a>
        </div>

        {/* Right: sign-off */}
        <p className="type-body-s text-text-tertiary">
          Proudly vibecoded with Claude Code
        </p>
      </div>
    </footer>
  );
}
