"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ExternalArrow } from "./icons/ExternalArrow";

interface PreviewData {
  src: string;
  caption: string;
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
// data-hover-preview-* attributes from the element under the cursor and
// renders a card that translates with the pointer. Edge-aware: flips
// quadrants near viewport edges. Hover-only by design — touch devices
// (`hover: none`) get a CSS-only inline ↗ arrow on chips and direct
// navigation; no SLOT-mode preview.
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
      const host = (el as HTMLElement | null)?.closest<HTMLElement>(
        "[data-hover-preview-src]"
      );
      if (!host) {
        setData((prev) => (prev === null ? prev : null));
        return;
      }
      const next: PreviewData = {
        src: host.dataset.hoverPreviewSrc!,
        caption: host.dataset.hoverPreviewCaption ?? "",
      };
      setData((prev) => (prev?.src === next.src ? prev : next));
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
            <Image
              src={data.src}
              alt=""
              width={320}
              height={180}
              className="hover-preview-img"
              priority
            />
            {data.caption && (
              <p className="hover-preview-caption">
                {data.caption}
                <ExternalArrow size={12} />
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
