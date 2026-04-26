"use client";

import { useEffect, useRef, useState } from "react";

type Tone = "default" | "inverted";

export default function CursorFollower() {
  const [label, setLabel] = useState<string | null>(null);
  const [tone, setTone] = useState<Tone>("default");
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const scrollRaf = useRef<number | null>(null);
  const hasMoved = useRef(false);
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

    const resolveLabel = () => {
      const el = document.elementFromPoint(pos.current.x, pos.current.y);
      const host = (el as HTMLElement | null)?.closest<HTMLElement>("[data-cursor-label]");
      const next = host?.dataset.cursorLabel ?? null;
      const nextTone: Tone = host?.dataset.cursorLabelTone === "inverted" ? "inverted" : "default";
      setLabel((prev) => (prev === next ? prev : next));
      setTone((prev) => (prev === nextTone ? prev : nextTone));
    };

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      hasMoved.current = true;
      if (raf.current == null) raf.current = requestAnimationFrame(apply);
      resolveLabel();
    };

    const onLeave = () => setLabel(null);

    const onScroll = () => {
      if (!hasMoved.current) return;
      if (scrollRaf.current != null) return;
      scrollRaf.current = requestAnimationFrame(() => {
        scrollRaf.current = null;
        resolveLabel();
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      if (raf.current != null) cancelAnimationFrame(raf.current);
      if (scrollRaf.current != null) cancelAnimationFrame(scrollRaf.current);
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
      <span
        className={`inline-block translate-x-4 translate-y-4 rounded-full type-body-s px-3 py-1.5 whitespace-nowrap ${
          tone === "inverted"
            ? "bg-text-inverse text-text-primary"
            : "bg-text-primary text-text-inverse"
        }`}
      >
        {label ?? ""}
      </span>
    </div>
  );
}
