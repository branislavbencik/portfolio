"use client";

import { useEffect, useRef, useState, ReactNode, PointerEvent } from "react";

type MouseCoordsProps = {
  children: ReactNode;
};

/**
 * Wraps a region of the page and renders the cursor's (x, y) coordinates as a
 * live tooltip following the pointer. Numbers only — no background — to keep
 * the "naked text" feel. The tooltip hides on coarse pointers (touch).
 *
 * The pane communicates the same idea the surrounding Shell Game does: the
 * interface is observing you. Together they argue: interfaces are projections
 * of reality, not the reality itself.
 */
export default function MouseCoords({ children }: MouseCoordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isFinePointer, setIsFinePointer] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsFinePointer(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsFinePointer(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  }

  function onPointerLeave() {
    setCoords(null);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative w-full h-full"
    >
      {children}
      {isFinePointer && coords && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute type-status text-text-secondary"
          style={{ left: `${coords.x + 12}px`, top: `${coords.y + 12}px` }} // audit-ignore — dynamic tooltip position
        >
          ({coords.x}, {coords.y})
        </span>
      )}
    </div>
  );
}
