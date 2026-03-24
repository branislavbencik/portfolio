"use client";

import { useEffect, useCallback, useState } from "react";
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

  const showNav = total !== undefined && total > 1 && onPrev && onNext;
  const showCounter = showNav && currentIndex !== undefined;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Counter — top left */}
          {showCounter && (
            <span className="absolute top-6 left-6 type-allcaps text-white opacity-50">
              {currentIndex! + 1} / {total}
            </span>
          )}

          {/* Close — top right */}
          <button
            className="absolute top-6 right-6 text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
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
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
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
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
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
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain block"
            />
            {caption && (
              <p className="type-body-s text-white opacity-70 text-center max-w-[600px]">
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
