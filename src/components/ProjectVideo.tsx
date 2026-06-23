"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Reactive media-query hook. useSyncExternalStore keeps SSR deterministic
 * (server snapshot is always false) so the rendered <video> markup matches on
 * hydration; only the post-mount play behavior differs by environment.
 */
function useMediaQuery(query: string): boolean {
  const subscribe = (cb: () => void) => {
    const m = window.matchMedia(query);
    m.addEventListener("change", cb);
    return () => m.removeEventListener("change", cb);
  };
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

interface ProjectVideoProps {
  src: string;
  poster: string;
  alt: string;
  width: number;
  height: number;
  /** Hero mode plays once in-view on every device. Thumbnail mode plays on
   *  hover (desktop) or in-view (touch). */
  hero?: boolean;
  className?: string;
}

/**
 * Plays a muted, controls-less demo clip once and holds the last frame
 * (no loop). The static `poster` is the rest state and the fallback for
 * reduced-motion / Save-Data users, who never trigger playback.
 */
export function ProjectVideo({
  src,
  poster,
  alt,
  width,
  height,
  hero = false,
  className,
}: ProjectVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const noHover = useMediaQuery("(hover: none)");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) return;

    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (conn?.saveData) return;

    const cleanups: Array<() => void> = [];

    // Autoplay once when scrolled into view — the hero showcase (every device)
    // and touch thumbnails (no hover to await). Holds the last frame after.
    if (hero || noHover) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && !playedRef.current) {
              playedRef.current = true;
              video.currentTime = 0;
              void video.play().catch(() => {});
            }
          }
        },
        { threshold: 0.5 },
      );
      io.observe(video);
      cleanups.push(() => io.disconnect());
    }

    // Desktop hover — re-hover restarts playback from the start (both modes).
    // On leave the thumbnail resets to its poster (clean static grid). The hero
    // has NO leave handler: its playback is usually autoplay-initiated, so
    // stopping it on an unrelated mouseout reads as a bug — let it always run to
    // completion and hold the last frame.
    if (!noHover) {
      const trigger = video.closest("a") ?? video.parentElement;
      if (trigger) {
        const onEnter = () => {
          video.currentTime = 0;
          void video.play().catch(() => {});
        };
        trigger.addEventListener("mouseenter", onEnter);

        const onLeave = !hero
          ? () => {
              video.pause();
              video.currentTime = 0;
            }
          : null;
        if (onLeave) trigger.addEventListener("mouseleave", onLeave);

        cleanups.push(() => {
          trigger.removeEventListener("mouseenter", onEnter);
          if (onLeave) trigger.removeEventListener("mouseleave", onLeave);
        });
      }
    }

    return () => cleanups.forEach((c) => c());
  }, [hero, noHover, reducedMotion]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      playsInline
      preload="none"
      aria-label={alt}
      className={className}
    />
  );
}
