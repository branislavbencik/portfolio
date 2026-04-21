"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface LightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  caption?: string;
  currentIndex?: number;
  total?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function Lightbox({
  src,
  alt,
  isOpen,
  onClose,
  caption,
  currentIndex,
  total,
  onPrev,
  onNext,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const savedFocusRef = useRef<Element | null>(null);

  useEffect(() => setMounted(true), []);

  // Save focus target and restore on close
  useEffect(() => {
    if (isOpen) {
      savedFocusRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      // Move focus to close button on next tick (after portal renders)
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      (savedFocusRef.current as HTMLElement)?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const showNav = total !== undefined && total > 1 && onPrev && onNext;

  // Focus trap: cycle through close, prev, next buttons only
  const handleTrapFocus = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = [
        closeButtonRef.current,
        showNav ? prevButtonRef.current : null,
        showNav ? nextButtonRef.current : null,
      ].filter(Boolean) as HTMLButtonElement[];

      if (focusable.length === 0) return;

      // Single focusable element: never let Tab escape the dialog
      if (focusable.length === 1) {
        e.preventDefault();
        focusable[0].focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [showNav]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev?.();
      if (e.key === "ArrowRight") onNext?.();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  if (!mounted) return null;

  const showCounter = showNav && currentIndex !== undefined;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-canvas cursor-zoom-out"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          onKeyDown={handleTrapFocus}
        >
          {/* Counter — top left */}
          {showCounter && (
            <span className="absolute top-5 left-5 type-allcaps text-text-primary opacity-75">
              {currentIndex! + 1} / {total}
            </span>
          )}

          {/* Close — top right */}
          <button
            ref={closeButtonRef}
            className="absolute top-4 right-4 p-2.5 text-text-primary opacity-80 hover:opacity-100 motion-safe:transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:opacity-100"
            onClick={onClose}
            aria-label="Close image"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Prev — left */}
          {showNav && (
            <button
              ref={prevButtonRef}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 text-text-primary opacity-80 hover:opacity-100 motion-safe:transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:opacity-100"
              onClick={(e) => { e.stopPropagation(); onPrev!(); }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Next — right */}
          {showNav && (
            <button
              ref={nextButtonRef}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-text-primary opacity-80 hover:opacity-100 motion-safe:transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:opacity-100"
              onClick={(e) => { e.stopPropagation(); onNext!(); }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Image + caption */}
          <motion.div
            className="flex flex-col items-center gap-4 max-w-[90vw]"
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain block"
            />
            {caption && (
              <p className="type-body-m text-text-secondary text-center max-w-[600px]">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
