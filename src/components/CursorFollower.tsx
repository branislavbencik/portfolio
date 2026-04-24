"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorFollower() {
  const [label, setLabel] = useState<string | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hoverCapable =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hoverCapable) return;

    const apply = () => {
      raf.current = null;
      const el = nodeRef.current;
      if (!el) return;
      el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current == null) raf.current = requestAnimationFrame(apply);

      const target = e.target as HTMLElement | null;
      const host = target?.closest<HTMLElement>("[data-cursor-label]");
      const next = host?.dataset.cursorLabel ?? null;
      setLabel((prev) => (prev === next ? prev : next));
    };

    const onLeave = () => setLabel(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={nodeRef}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[90] will-change-transform motion-safe:transition-opacity motion-safe:duration-150 ${
        label ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="inline-block translate-x-4 translate-y-4 rounded-full bg-text-primary text-text-inverse type-body-s px-3 py-1.5 whitespace-nowrap">
        {label ?? ""}
      </span>
    </div>
  );
}
