import { ExternalArrow } from "@/components/icons/ExternalArrow";
import { Lock } from "@/components/icons/Lock";

interface DeliverableItem {
  label: string;
  href: string;
  caption?: string;
  // When true, render as a non-interactive button with an "NDA + lock"
  // annotation at the right edge (where ExternalArrow sits on active).
  // Silhouette parity with active items; semantic substitution of the
  // navigation symbol for a constraint signal.
  disabled?: boolean;
}

interface DeliverablesBarProps {
  items: DeliverableItem[];
}

export function DeliverablesBar({ items }: DeliverablesBarProps) {
  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-frame mx-center max-lg:px-content-x pt-4">
      <div className="max-w-column mx-auto w-full">
        <div className="flex flex-col gap-2">
          {items.map((item, i) =>
            item.disabled ? (
              <div
                key={i}
                aria-disabled="true"
                aria-label={`${item.label} — under NDA, not shareable`}
                className="flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm opacity-50 cursor-not-allowed pointer-events-none select-none"
              >
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="type-label text-text-secondary truncate">
                    {item.label}
                  </span>
                  {item.caption && (
                    <span className="type-caption text-text-secondary">
                      {item.caption}
                    </span>
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
            ) : (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  item.caption
                    ? `Open ${item.label} (opens in new tab): ${item.caption}`
                    : `Open ${item.label} (opens in new tab)`
                }
                className="group flex items-center justify-between gap-6 px-6 py-3 max-md:px-4 border border-[var(--border-light)] rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-inset motion-safe:transition-colors motion-safe:duration-[200ms] motion-safe:ease-out hover:border-[var(--border-light-hover)]"
              >
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="type-label text-text-primary truncate">
                    {item.label}
                  </span>
                  {item.caption && (
                    <span className="type-caption text-text-secondary">
                      {item.caption}
                    </span>
                  )}
                </span>
                <ExternalArrow
                  size={14}
                  className="shrink-0 text-text-primary motion-safe:transition-transform motion-safe:duration-[200ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-focus-visible:translate-x-[2px] group-focus-visible:-translate-y-[2px]"
                />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}
