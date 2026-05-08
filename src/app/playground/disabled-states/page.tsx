// Disabled / NDA-locked states playground.
// Visual picker for two surfaces:
//   1. Hero chip (CitationLink) — when the artifact behind it is NDA-bound
//   2. Detail-page deliverable button (DeliverablesBar item) — same constraint
// Plus a unified mobile/desktop card surface (your-idea-wins).
//
// This page does NOT modify production components. It is read-only:
// the chip and button shapes are replicated inline so each variant can
// layer disabled treatments without affecting CitationLink.tsx or
// DeliverablesBar.tsx. After review, the chosen variants get applied
// to those components in a follow-up session.
//
// Recommended picks (chat-side analysis 2026-05-08, polished pass):
//   A5a / A5b / A5c — all three image-with-overlay variants are live
//                     candidates; pick one based on visual preference
//   B5  — silhouette parity, lock at right edge (current default)
//   B5b — same as B5 + tiny NDA mono annotation before the lock
//   Mobile parity — same card surface on both breakpoints,
//                   bottom-anchored on touch, cursor-following on hover
//
// Earlier rejected variants (A1–A4, B1–B4, M1–M4) kept below as reference.
// Not linked from nav. Reachable via /playground/disabled-states.

"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import HoverPreview from "@/components/HoverPreview";
import { ExternalArrow } from "@/components/icons/ExternalArrow";
import { Lock } from "@/components/icons/Lock";

// ── Hover capability hook ─────────────────────────────────────────

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

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

// ── Locked overlay variants ───────────────────────────────────────
// Three polished overlay treatments. Image is visible in all three;
// the overlay is the *only* disabled signal (per design feedback —
// no duplicate metadata text or icon modifiers elsewhere).

type OverlayVariant = "scrim" | "blur" | "corner";

function LockedOverlay({ variant }: { variant: OverlayVariant }) {
  if (variant === "scrim") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ background: "oklch(98% 0 0 / 0.72)" }}
      >
        <Lock size={26} className="text-text-primary" />
      </div>
    );
  }
  if (variant === "blur") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "oklch(98% 0 0 / 0.32)",
        }}
      >
        <Lock size={26} className="text-text-primary" />
      </div>
    );
  }
  // corner — image stays clear, small "NDA + lock" pill top-right.
  // Pill carries both the *category* (NDA, not paywall/login) and the
  // *signal* (lock). Caption strip below carries the project name only,
  // no NDA repetition.
  return (
    <div
      className="absolute top-2 right-2 flex items-center gap-1.5 px-1.5 py-1"
      style={{
        height: 22,
        borderRadius: 5,
        background: "oklch(99% 0 0 / 0.92)",
        border: "1px solid var(--surface-2)",
        backdropFilter: "blur(2px)",
      }}
    >
      <span
        className="text-[9px] font-mono uppercase text-text-primary"
        style={{ letterSpacing: "0.12em", lineHeight: 1 }}
      >
        NDA
      </span>
      <Lock size={10} className="text-text-primary" />
    </div>
  );
}

// ── Locked hover card (cursor-following, desktop only) ────────────
// Mirrors HoverPreview.tsx logic but reads `data-locked-preview-*`
// attributes and renders a real preview image with a LockedOverlay
// on top. No caption strip — the overlay carries the entire message.

interface LockedData {
  src: string;
  variant: OverlayVariant;
  caption: string;
}

function LockedHoverCard() {
  const [data, setData] = useState<LockedData | null>(null);
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
        "[data-locked-preview-src]"
      );
      if (!host) {
        setData((prev) => (prev === null ? prev : null));
        return;
      }
      const next: LockedData = {
        src: host.dataset.lockedPreviewSrc!,
        variant: (host.dataset.lockedPreviewVariant as OverlayVariant) ?? "scrim",
        caption: host.dataset.lockedPreviewCaption ?? "",
      };
      setData((prev) =>
        prev?.src === next.src &&
        prev?.variant === next.variant &&
        prev?.caption === next.caption
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
      className="pointer-events-none fixed top-0 left-0 z-[100] thumb-280"
    >
      <div
        className="hover-preview-card"
        data-visible={data ? "true" : "false"}
      >
        {data && (
          <>
            <div className="hover-preview-img relative overflow-hidden">
              <Image
                src={data.src}
                alt=""
                width={320}
                height={180}
                className="hover-preview-img"
                priority
              />
              <LockedOverlay variant={data.variant} />
            </div>
            {data.caption && (
              <p className="hover-preview-caption">{data.caption}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Shared section helpers ────────────────────────────────────────

interface VariantSectionProps {
  id: string;
  name: string;
  spec: string;
  caveat?: string;
  recommended?: boolean;
  children: React.ReactNode;
}

function VariantSection({
  id,
  name,
  spec,
  caveat,
  recommended,
  children,
}: VariantSectionProps) {
  return (
    <section className="border-b border-surface-2">
      <div className="max-w-frame mx-center max-lg:px-content-x py-section">
        <header className="mb-12 max-w-column">
          <p className="type-allcaps text-text-secondary mb-2">
            Variant {id}
            {recommended && (
              <span className="ml-3 inline-block px-2 py-0.5 text-[10px] tracking-wider rounded-sm bg-text-primary text-white">
                CANDIDATE
              </span>
            )}
          </p>
          <h2 className="type-subheading text-text-primary mb-2">{name}</h2>
          <p className="type-caption text-text-secondary font-mono">{spec}</p>
          {caveat && (
            <p className="type-caption text-text-secondary mt-2 italic">⚠ {caveat}</p>
          )}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
}

function SectionDivider({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-12 border-b border-surface-2">
      <p className="type-allcaps text-text-secondary mb-3">{kicker}</p>
      <h2 className="type-heading text-text-primary mb-4">{title}</h2>
      <p className="type-body text-text-secondary max-w-column">{body}</p>
    </header>
  );
}

// ── Hero lede block (mirrors HeroStatement.tsx composition) ───────

interface HeroLedeProps {
  prototypesChip: React.ReactNode;
}

const NON_NDA_PROTO_HREF = "https://reprio.vercel.app/";
const NON_NDA_PROTO_PREVIEW = "/images/hero-previews/reprio.png";
const SCHNEIDER_PREVIEW = "/images/hero-previews/schneider.png";

function HeroLede({ prototypesChip }: HeroLedeProps) {
  return (
    <div className="card-style-casestudy shadow-on thumb-280 p-10 max-md:p-6">
      <p className="type-lede text-text-primary max-w-lede">
        I tend to be useful anywhere from mapping{" "}
        <ActiveChip
          label="systems"
          href="https://www.figma.com/board/u3gtseQ4wvLMcpNUy4UWWP/Teatime-procesy?node-id=2034-7737"
          previewSrc="/images/hero-previews/service-design.png"
          previewCaption="Service design of the learning system"
        />, through shipping{" "}
        <ActiveChip
          label="automations"
          href="https://share-n8n.com/shared/888fkQf1zCAc"
          previewSrc="/images/hero-previews/n8n.png"
          previewCaption="n8n workflow for speech evaluation"
        />,{" "}
        {prototypesChip}, and{" "}
        <ActiveChip
          label="code"
          href="https://reprio.vercel.app/"
          previewSrc="/images/hero-previews/reprio.png"
          previewCaption="Chat with AI to prioritize tasks"
        />. I focus on the path of maximum leverage in heavy tradeoffs.
      </p>
    </div>
  );
}

interface ActiveChipProps {
  label: string;
  href: string;
  previewSrc?: string;
  previewCaption?: string;
}

function ActiveChip({ label, href, previewSrc, previewCaption }: ActiveChipProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="chip-link chip-color-blue link-underline"
      {...(previewSrc ? { "data-hover-preview-src": previewSrc } : {})}
      {...(previewCaption ? { "data-hover-preview-caption": previewCaption } : {})}
    >
      {label}
      <span className="chip-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

// Locked chip — looks identical to ActiveChip; lock state lives in
// the hover card via data-locked-preview-* attributes.
function LockedChip({ variant }: { variant: OverlayVariant }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      className="chip-link chip-color-blue link-underline"
      data-locked-preview-src={SCHNEIDER_PREVIEW}
      data-locked-preview-variant={variant}
      data-locked-preview-caption="Schneider Electric configurator"
      aria-label="prototypes — link gated under NDA"
    >
      prototypes
      <span className="chip-arrow" aria-hidden="true">↗</span>
    </a>
  );
}

function ChipControl() {
  return (
    <ActiveChip
      label="prototypes"
      href={NON_NDA_PROTO_HREF}
      previewSrc={NON_NDA_PROTO_PREVIEW}
      previewCaption="Live prototype — comparison only"
    />
  );
}

// Reference (rejected) chip variants — modifier on the chip itself.

function ChipA1() {
  return (
    <span
      aria-disabled="true"
      className="chip-link text-text-secondary inline-flex items-center pointer-events-none select-none"
    >
      <Lock />
      prototypes
    </span>
  );
}

function ChipA2() {
  return (
    <span
      aria-disabled="true"
      className="chip-link text-text-secondary inline-flex items-center pointer-events-none select-none"
      style={{
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: "var(--text-secondary)",
        textUnderlineOffset: "3px",
      }}
    >
      <Lock />
      prototypes
    </span>
  );
}

function ChipA3() {
  return (
    <span
      aria-disabled="true"
      className="chip-link chip-color-blue inline-flex items-center pointer-events-none select-none"
    >
      <Lock />
      <span style={{ textDecoration: "line-through", textDecorationThickness: "1px" }}>
        prototypes
      </span>
    </span>
  );
}

function ChipA4() {
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className="chip-link text-text-secondary inline-flex items-center bg-transparent border-0 p-0 m-0 cursor-not-allowed [font:inherit]"
      title="Under NDA — prototype not shareable"
    >
      <Lock />
      prototypes
    </button>
  );
}

// ── Deliverable button row (mirrors DeliverablesBar.tsx) ──────────

interface DeliverableRowProps {
  items: React.ReactNode[];
}

function DeliverableRow({ items }: DeliverableRowProps) {
  return (
    <div className="w-full max-w-frame mx-center max-lg:px-content-x">
      <div className="max-w-column mx-auto w-full">
        <div className="flex flex-col gap-2">{items}</div>
      </div>
    </div>
  );
}

function ActiveDeliverable({
  label,
  href,
  caption,
}: {
  label: string;
  href: string;
  caption?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-inset motion-safe:transition-colors motion-safe:duration-[200ms] motion-safe:ease-out hover:border-[var(--border-light-hover)]"
    >
      <span className="flex flex-col gap-0.5 min-w-0">
        <span className="type-label text-text-primary truncate">{label}</span>
        {caption && (
          <span className="type-caption text-text-secondary">{caption}</span>
        )}
      </span>
      <ExternalArrow
        size={14}
        className="shrink-0 text-text-primary motion-safe:transition-transform motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
      />
    </a>
  );
}

interface DisabledDeliverableProps {
  label: string;
  caption?: string;
  variant: "B1" | "B2" | "B3" | "B4" | "B5" | "B5b";
}

function DisabledDeliverable({ label, caption, variant }: DisabledDeliverableProps) {
  // B5 — Silhouette parity. Lock at the right edge where ↗ sits on
  // the active button. Muted text, opacity-50.
  if (variant === "B5") {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm opacity-50 cursor-not-allowed pointer-events-none select-none"
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="type-label text-text-secondary truncate">{label}</span>
          {caption && (
            <span className="type-caption text-text-secondary">{caption}</span>
          )}
        </span>
        <Lock size={14} className="shrink-0 text-text-secondary" />
      </div>
    );
  }
  // B5b — B5 with tiny "NDA" mono-caps annotation before the lock.
  // Categorizes the lock (legal, not paywall/login/security).
  if (variant === "B5b") {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm opacity-50 cursor-not-allowed pointer-events-none select-none"
      >
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="type-label text-text-secondary truncate">{label}</span>
          {caption && (
            <span className="type-caption text-text-secondary">{caption}</span>
          )}
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] font-mono uppercase text-text-secondary"
            style={{ letterSpacing: "0.12em" }}
          >
            NDA
          </span>
          <Lock size={14} className="text-text-secondary" />
        </span>
      </div>
    );
  }
  if (variant === "B1") {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm opacity-50 cursor-not-allowed pointer-events-none select-none"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Lock size={14} className="shrink-0 text-text-secondary" />
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="type-label text-text-secondary truncate">{label}</span>
            {caption && (
              <span className="type-caption text-text-secondary">{caption}</span>
            )}
          </span>
        </span>
      </div>
    );
  }
  if (variant === "B2") {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm cursor-not-allowed pointer-events-none select-none"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Lock size={14} className="shrink-0 text-text-primary" />
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="type-label text-text-primary truncate">
              {label} <span className="text-text-secondary">(locked)</span>
            </span>
            {caption && (
              <span className="type-caption text-text-secondary">{caption}</span>
            )}
          </span>
        </span>
      </div>
    );
  }
  if (variant === "B3") {
    return (
      <div
        aria-disabled="true"
        className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-surface-2 rounded-sm bg-transparent cursor-not-allowed pointer-events-none select-none"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Lock size={14} className="shrink-0 text-text-secondary" />
          <span className="flex flex-col gap-0.5 min-w-0">
            <span className="type-label text-text-primary truncate">{label}</span>
            {caption && (
              <span className="type-caption text-text-secondary">{caption}</span>
            )}
          </span>
        </span>
      </div>
    );
  }
  // B4 — tooltip on hover
  return (
    <div
      aria-disabled="true"
      title="Under NDA — prototype not shareable"
      className="group/tooltip relative flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm cursor-help select-none"
    >
      <span className="flex items-center gap-2 min-w-0">
        <Lock size={14} className="shrink-0 text-text-secondary" />
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className="type-label text-text-primary truncate">{label}</span>
          {caption && (
            <span className="type-caption text-text-secondary">{caption}</span>
          )}
        </span>
      </span>
      <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-sm bg-text-primary text-white text-[12px] whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 motion-safe:transition-opacity pointer-events-none">
        Under NDA — prototype not shareable
      </span>
    </div>
  );
}

// ── Mobile frame (375px simulated viewport) ───────────────────────

interface MobileFrameProps {
  variant: "Parity" | "M1" | "M2" | "M3" | "M4";
  overlayVariant?: OverlayVariant;
}

function MobileFrame({ variant, overlayVariant = "corner" }: MobileFrameProps) {
  const [tapped, setTapped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (variant !== "Parity") return;
    if (tapped) {
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    } else {
      setMounted(false);
    }
  }, [tapped, variant]);

  return (
    <div className="flex flex-col gap-3 items-start">
      <div
        className="relative w-[375px] h-[600px] border border-surface-2 rounded-[24px] overflow-hidden bg-canvas"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.04)" }}
      >
        {/* Mock status bar */}
        <div className="h-7 flex items-center justify-between px-6 text-[11px] text-text-primary">
          <span>9:41</span>
          <span>•••</span>
        </div>

        {/* Hero lede simulation */}
        <div className="px-5 pt-4">
          <p className="type-byline text-text-primary text-[16px] mb-1">Hi, I&apos;m Branislav,</p>
          <h3 className="type-display text-text-primary text-[28px] leading-[1.15] mb-4">
            Generalist Product Designer.
          </h3>
          <p className="text-text-primary text-[15px] leading-[1.45]">
            I tend to be useful anywhere from mapping{" "}
            <span className="chip-color-blue underline underline-offset-2">systems</span>, through shipping{" "}
            <span className="chip-color-blue underline underline-offset-2">automations</span>,{" "}
            <button
              type="button"
              onClick={() => setTapped(!tapped)}
              className="inline-flex items-center chip-color-blue underline underline-offset-2 cursor-pointer p-0 bg-transparent border-0 [font:inherit]"
            >
              prototypes
            </button>
            , and{" "}
            <span className="chip-color-blue underline underline-offset-2">code</span>.
          </p>
        </div>

        {/* Parity — same card surface as desktop, flowing below the
            lede (production will anchor under the chip itself; here
            we render in normal flow so the simulator doesn't overlap
            the headline). */}
        {variant === "Parity" && tapped && (
          <div
            data-mounted={mounted}
            className="px-5 mt-5 motion-safe:transition-[opacity,transform] motion-safe:duration-[280ms] motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)] data-[mounted=false]:opacity-0 data-[mounted=false]:translate-y-2 data-[mounted=true]:opacity-100 data-[mounted=true]:translate-y-0"
          >
            <div className="hover-preview-card" data-visible="true">
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={SCHNEIDER_PREVIEW}
                  alt=""
                  fill
                  sizes="335px"
                  style={{ objectFit: "cover" }}
                />
                <LockedOverlay variant={overlayVariant} />
              </div>
              <p className="hover-preview-caption">
                Schneider Electric configurator
              </p>
            </div>
          </div>
        )}

        {/* M1 — Reserved-space card under hero (always visible) */}
        {variant === "M1" && (
          <div className="absolute left-5 right-5 bottom-12 border border-surface-2 rounded-md p-3 bg-canvas min-h-[88px]">
            {tapped ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <Lock size={12} />
                  <span className="type-allcaps text-text-secondary text-[10px]">Under NDA</span>
                </div>
                <p className="text-[13px] text-text-primary leading-[1.4]">
                  Schneider Electric configurator prototype. Static screenshots below; live prototype not shareable.
                </p>
              </>
            ) : (
              <p className="text-[13px] text-text-secondary leading-[1.4] italic">
                Tap a chip to see context.
              </p>
            )}
          </div>
        )}

        {/* M2 — Inline accordion */}
        {variant === "M2" && tapped && (
          <div className="px-5 mt-4">
            <div className="border-l-2 border-text-secondary pl-3 py-1">
              <div className="flex items-center gap-2 mb-1">
                <Lock size={12} />
                <span className="type-allcaps text-text-secondary text-[10px]">Under NDA</span>
              </div>
              <p className="text-[13px] text-text-primary leading-[1.4]">
                Schneider Electric configurator prototype. Static screenshots in the case study; live prototype not shareable.
              </p>
            </div>
          </div>
        )}

        {/* M3 — Bottom sheet */}
        {variant === "M3" && tapped && (
          <>
            <div
              className="absolute inset-0 bg-black/20"
              onClick={() => setTapped(false)}
            />
            <div className="absolute left-0 right-0 bottom-0 bg-canvas border-t border-surface-2 rounded-t-2xl p-5 pb-8">
              <div className="w-10 h-1 rounded-full bg-surface-2 mx-auto mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <Lock size={13} />
                <span className="type-allcaps text-text-secondary text-[11px]">Under NDA</span>
              </div>
              <p className="text-[14px] text-text-primary leading-[1.45] mb-3">
                Schneider Electric configurator prototype. The live prototype isn&apos;t shareable, but the case study below has static screenshots and the design rationale.
              </p>
              <button
                type="button"
                onClick={() => setTapped(false)}
                className="text-[13px] text-text-secondary underline underline-offset-2"
              >
                Dismiss
              </button>
            </div>
          </>
        )}

        {/* M4 — Toast */}
        {variant === "M4" && tapped && (
          <div className="absolute left-1/2 bottom-8 -translate-x-1/2 px-4 py-2 rounded-md bg-text-primary text-white text-[13px] whitespace-nowrap">
            <span className="inline-flex items-center gap-2">
              <Lock size={11} className="text-white" /> Under NDA
            </span>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setTapped(!tapped)}
        className="text-[13px] text-text-secondary underline underline-offset-2"
      >
        {tapped ? "Reset frame" : "Simulate tap on 'prototypes' chip"}
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default function DisabledStatesPlaygroundPage() {
  return (
    <main>
      <HoverPreview />
      <LockedHoverCard />

      <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-secondary mb-3">Design lab</p>
        <h1 className="type-heading text-text-primary mb-4">
          Disabled / NDA-locked states
        </h1>
        <p className="type-body text-text-secondary max-w-column">
          Polished pass. Three image-with-overlay candidates for Section A;
          two B-options (with/without &quot;NDA&quot; tag); one mobile-parity
          card (same surface as desktop, bottom-anchored on touch). Earlier
          rejected variants kept below as reference.
        </p>
      </header>

      {/* ── Section A — Hero chip variants ─────────────────────── */}
      <SectionDivider
        kicker="Section A"
        title="Hero chip — desktop"
        body="Chip stays styled like the others. The locked card shows the real preview image with a semitransparent lock overlay — no caption strip, no metadata, no duplicates. Three overlay treatments below; pick one."
      />

      <VariantSection
        id="A5a"
        name="Solid scrim — white at 72% opacity, centered lock"
        spec="image at 100% · oklch(98% 0 0 / 0.72) overlay · lock 26px text-primary · no caption strip"
        recommended
      >
        <HeroLede prototypesChip={<LockedChip variant="scrim" />} />
      </VariantSection>

      <VariantSection
        id="A5b"
        name="Frosted glass — backdrop-filter blur 8px, centered lock"
        spec="image at 100% · backdrop-filter: blur(8px) · oklch(98% 0 0 / 0.32) tint · lock 26px text-primary · no caption strip"
        recommended
      >
        <HeroLede prototypesChip={<LockedChip variant="blur" />} />
      </VariantSection>

      <VariantSection
        id="A5c"
        name="Corner badge — image clear, small lock pill top-right"
        spec="image at 100% · 22px lock pill at top:8 right:8 · canvas/0.92 bg + surface-2 border · no caption strip"
        recommended
        caveat="Most distinctive. Image carries everything; lock confirms gating."
      >
        <HeroLede prototypesChip={<LockedChip variant="corner" />} />
      </VariantSection>

      <VariantSection
        id="Control"
        name="Active chip (current live behavior, comparison only)"
        spec="chip-link · chip-color-blue · link-underline · data-hover-preview-* · href"
        caveat="Reference. Uses Reprio (non-NDA) URL + preview image."
      >
        <HeroLede prototypesChip={<ChipControl />} />
      </VariantSection>

      <VariantSection
        id="A1"
        name="Lock prefix, muted (rejected — modifier on chip)"
        spec="aria-disabled · text-secondary · pointer-events-none · lock 12px prefix · no underline"
        caveat="Reference / rejected. Modifier on chip pays scan-time visibility tax."
      >
        <HeroLede prototypesChip={<ChipA1 />} />
      </VariantSection>

      <VariantSection
        id="A2"
        name="Lock prefix, dotted underline (rejected)"
        spec="aria-disabled · text-secondary · pointer-events-none · lock 12px prefix · dotted underline 3px offset"
        caveat="Reference / rejected."
      >
        <HeroLede prototypesChip={<ChipA2 />} />
      </VariantSection>

      <VariantSection
        id="A3"
        name="Strikethrough on label + lock (rejected)"
        spec="aria-disabled · chip-color-blue · pointer-events-none · lock 12px prefix · line-through 1px"
        caveat="Reference / rejected. Reads defensive."
      >
        <HeroLede prototypesChip={<ChipA3 />} />
      </VariantSection>

      <VariantSection
        id="A4"
        name="Native <button disabled> semantics (rejected)"
        spec="<button disabled> · aria-disabled · cursor-not-allowed · text-secondary · lock 12px prefix · native title attr"
        caveat="Reference / rejected."
      >
        <HeroLede prototypesChip={<ChipA4 />} />
      </VariantSection>

      {/* ── Section B — Deliverable button variants ───────────── */}
      <SectionDivider
        kicker="Section B"
        title="Deliverable button — case-study detail page"
        body="B5 swaps ↗ for a lock at the right edge — silhouette parity with the active row. B5b adds a tiny mono 'NDA' annotation before the lock to categorize the lock (legal, not paywall). Pick B5 (terse) or B5b (one-glance honesty)."
      />

      <VariantSection
        id="B5"
        name="Silhouette parity — lock at right (no text)"
        spec="aria-disabled · opacity-50 · pointer-events-none · text-secondary · lock 14px right"
        recommended
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b5a" label="Design Sprint Figjam" variant="B5" />,
            <DisabledDeliverable key="b5b" label="Figma Prototype" variant="B5" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="B5b"
        name="Silhouette parity + tiny 'NDA' mono annotation"
        spec='aria-disabled · opacity-50 · text-secondary · "NDA" 10px mono uppercase tracking 0.12em · gap-2 · lock 14px right'
        recommended
        caveat="3-character cost. Categorizes the lock (legal vs paywall vs login). My pick."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b5ba" label="Design Sprint Figjam" variant="B5b" />,
            <DisabledDeliverable key="b5bb" label="Figma Prototype" variant="B5b" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="Control"
        name="Active deliverable button (current live behavior)"
        spec="<a href> · border-light · group-hover · ExternalArrow with translate"
        caveat="Reference."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="B1"
        name="Lock + muted (lock on left, rejected)"
        spec="aria-disabled · opacity-50 · cursor-not-allowed · pointer-events-none · text-secondary · lock 14px left"
        caveat="Reference / rejected. Lock-on-left fragments row into checklist feel."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b1a" label="Design Sprint Figjam" variant="B1" />,
            <DisabledDeliverable key="b1b" label="Figma Prototype" variant="B1" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="B2"
        name="Lock + suffixed '(locked)' (rejected)"
        spec="aria-disabled · text-primary · text-secondary suffix · pointer-events-none · lock 14px"
        caveat="Reference / rejected."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b2a" label="Design Sprint Figjam" variant="B2" />,
            <DisabledDeliverable key="b2b" label="Figma Prototype" variant="B2" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="B3"
        name="Outlined ghost (rejected)"
        spec="aria-disabled · border-surface-2 · bg-transparent · text-primary · pointer-events-none · lock 14px"
        caveat="Reference / rejected."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b3a" label="Design Sprint Figjam" variant="B3" />,
            <DisabledDeliverable key="b3b" label="Figma Prototype" variant="B3" />,
          ]}
        />
      </VariantSection>

      <VariantSection
        id="B4"
        name="Tooltip on hover (rejected)"
        spec="aria-disabled · cursor-help · custom tooltip · native title fallback · lock 14px"
        caveat="Reference / rejected. Hover-only fails on mobile."
      >
        <DeliverableRow
          items={[
            <ActiveDeliverable key="ctrl" label="skoala.cz" href="https://skoala.cz" />,
            <DisabledDeliverable key="b4a" label="Design Sprint Figjam" variant="B4" />,
            <DisabledDeliverable key="b4b" label="Figma Prototype" variant="B4" />,
          ]}
        />
      </VariantSection>

      {/* ── Section C — Mobile parity card ─────────────────────── */}
      <SectionDivider
        kicker="Section C"
        title="Mobile reveal — parity with desktop"
        body="Same card surface as desktop, just bottom-anchored on tap. No new chrome, no different design — chip click → card slides in → tap-outside dismisses. Three variants below match the three desktop overlay treatments. Pick must align with Section A choice."
      />

      <VariantSection
        id="Parity-a"
        name="Mobile card — Solid scrim (matches A5a)"
        spec="same .hover-preview-card chrome · bottom-anchored 16px · 280ms cubic-bezier(0.32, 0.72, 0, 1) slide-in · scrim overlay variant"
        recommended
      >
        <MobileFrame variant="Parity" overlayVariant="scrim" />
      </VariantSection>

      <VariantSection
        id="Parity-b"
        name="Mobile card — Frosted glass blur (matches A5b)"
        spec="same .hover-preview-card chrome · bottom-anchored · backdrop-filter blur 8px overlay"
        recommended
      >
        <MobileFrame variant="Parity" overlayVariant="blur" />
      </VariantSection>

      <VariantSection
        id="Parity-c"
        name="Mobile card — Corner lock badge (matches A5c)"
        spec="same .hover-preview-card chrome · bottom-anchored · top-right 22px lock pill"
        recommended
      >
        <MobileFrame variant="Parity" overlayVariant="corner" />
      </VariantSection>

      <VariantSection
        id="M1"
        name="Reserved-space card under hero (rejected — separate mobile design)"
        spec="persistent slot ~88px · no layout shift on tap · pre-state 'tap a chip' hint"
        caveat="Reference / rejected. Pre-state hint reads as instructional UI; separate mobile design loses cohesion."
      >
        <MobileFrame variant="M1" />
      </VariantSection>

      <VariantSection
        id="M2"
        name="Inline accordion (rejected)"
        spec="<details>-style expand below lede"
        caveat="Reference / rejected. Different chrome from desktop card."
      >
        <MobileFrame variant="M2" />
      </VariantSection>

      <VariantSection
        id="M3"
        name="Bottom sheet (rejected)"
        spec="slides up from bottom · scrim dims page"
        caveat="Reference / rejected. App-feeling on web; introduces new chrome type."
      >
        <MobileFrame variant="M3" />
      </VariantSection>

      <VariantSection
        id="M4"
        name="Toast (rejected)"
        spec="transient · tap to clear"
        caveat="Reference / rejected. Insufficient information."
      >
        <MobileFrame variant="M4" />
      </VariantSection>
    </main>
  );
}
