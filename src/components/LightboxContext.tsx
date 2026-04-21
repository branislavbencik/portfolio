"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { Lightbox } from "./Lightbox";

type ImageEntry = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

type LightboxContextValue = {
  register: (entry: ImageEntry) => void;
  unregister: (id: string) => void;
  open: (id: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ImageEntry[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  // Stable ref so register/unregister closures don't go stale
  const imagesRef = useRef<ImageEntry[]>([]);

  const register = useCallback((entry: ImageEntry) => {
    setImages((prev) => {
      if (prev.some((e) => e.id === entry.id)) return prev;
      const next = [...prev, entry];
      imagesRef.current = next;
      return next;
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setImages((prev) => {
      const next = prev.filter((e) => e.id !== id);
      imagesRef.current = next;
      return next;
    });
  }, []);

  const open = useCallback((id: string) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  const currentIndex = images.findIndex((e) => e.id === openId);
  const current = currentIndex >= 0 ? images[currentIndex] : null;

  const prev = useCallback(() => {
    if (currentIndex < 0) return;
    setOpenId(images[(currentIndex - 1 + images.length) % images.length].id);
  }, [currentIndex, images]);

  const next = useCallback(() => {
    if (currentIndex < 0) return;
    setOpenId(images[(currentIndex + 1) % images.length].id);
  }, [currentIndex, images]);

  return (
    <LightboxContext.Provider value={{ register, unregister, open }}>
      {children}
      {current && (
        <Lightbox
          isOpen={true}
          onClose={close}
          src={current.src}
          alt={current.alt}
          caption={current.caption}
          currentIndex={currentIndex}
          total={images.length}
          onPrev={images.length > 1 ? prev : undefined}
          onNext={images.length > 1 ? next : undefined}
        />
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside LightboxProvider");
  return ctx;
}
