"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";
import { Lock } from "./icons/Lock";

interface PreviewData {
  src: string;
  caption: string;
  // When true, render the NDA + lock corner badge over the image.
  // The chip itself is styled identically to active chips; the locked
  // state lives entirely in this card.
  locked: boolean;
}

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

// Subscribe to (hover: hover) so SSR + hydration agree (server snapshot is
// false; client snaps to the actual value after hydration without warning).
function useHoverCapable(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(HOVER_QUERY);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(HOVER_QUERY).matches,
    () => false
  );
}

// Cursor-following 320×180 image card mounted to body. Reads
// data-hover-preview-* (active) or data-locked-preview-* (NDA-locked)
// attributes from the element under the cursor and renders a card
// that translates with the pointer. Edge-aware: flips quadrants near
// viewport edges. Hover-only by design — touch devices (`hover: none`)
// get the inline ↗ arrow on chips; mobile tap-to-card pattern is a
// future symmetric extension (Phase 2).
export default function HoverPreview() {
  const [data, setData] = useState<PreviewData | null>(null);
  const hoverCapable = useHoverCapable();
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const followNodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hoverCapable) return;

    const apply = () => {
      raf.current = null;
      const el = followNodeRef.current;
      if (!el) return;
      const cardW = el.offsetWidth;
      const cardH = el.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const offset = 16;
      let x = pos.current.x + offset;
      let y = pos.current.y + offset;
      if (x + cardW > vw - 8) x = pos.current.x - cardW - offset;
      if (y + cardH > vh - 8) y = pos.current.y - cardH - offset;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const resolve = () => {
      const el = document.elementFromPoint(pos.current.x, pos.current.y);
      const target = el as HTMLElement | null;
      const lockedHost = target?.closest<HTMLElement>(
        "[data-locked-preview-src]"
      );
      if (lockedHost) {
        const next: PreviewData = {
          src: lockedHost.dataset.lockedPreviewSrc!,
          caption: lockedHost.dataset.lockedPreviewCaption ?? "",
          locked: true,
        };
        setData((prev) =>
          prev?.src === next.src &&
          prev?.caption === next.caption &&
          prev?.locked === next.locked
            ? prev
            : next
        );
        return;
      }
      const host = target?.closest<HTMLElement>("[data-hover-preview-src]");
      if (!host) {
        setData((prev) => (prev === null ? prev : null));
        return;
      }
      const next: PreviewData = {
        src: host.dataset.hoverPreviewSrc!,
        caption: host.dataset.hoverPreviewCaption ?? "",
        locked: false,
      };
      setData((prev) =>
        prev?.src === next.src &&
        prev?.caption === next.caption &&
        prev?.locked === next.locked
          ? prev
          : next
      );
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current == null) raf.current = requestAnimationFrame(apply);
      resolve();
    };
    const onLeave = () => setData(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [hoverCapable]);

  if (!hoverCapable) return null;

  return (
    <div
      ref={followNodeRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100]"
    >
      <div
        className="hover-preview-card"
        data-visible={data ? "true" : "false"}
      >
        {data && (
          <>
            <div className="relative">
              <Image
                src={data.src}
                alt=""
                width={320}
                height={180}
                className="hover-preview-img"
                priority
              />
              {data.locked && (
                <>
                  {/* Baseline 0.05 black scrim — keeps pill contrast
                      stable across bright/busy thumbnail areas without
                      visibly veiling the image. */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "oklch(0% 0 0 / 0.05)" }}
                  />
                  <div
                    className="locked-card-badge-enter absolute pointer-events-none flex items-center gap-1.5"
                    style={{
                      top: 12,
                      right: 12,
                      padding: "6px 10px",
                      borderRadius: 6,
                      background: "oklch(99% 0 0 / 0.92)",
                      border: "1px solid var(--surface-2)",
                      backdropFilter: "blur(2px)",
                    }}
                  >
                    <span
                      className="text-[10px] font-mono uppercase text-text-primary"
                      style={{ letterSpacing: "0.12em", lineHeight: 1 }}
                    >
                      NDA
                    </span>
                    <span className="locked-card-lock-snap inline-flex">
                      <Lock size={12} className="text-text-primary" />
                    </span>
                  </div>
                </>
              )}
            </div>
            {data.caption && (
              <p className="hover-preview-caption">
                {data.caption}
                {!data.locked && <ExternalArrow size={12} />}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
