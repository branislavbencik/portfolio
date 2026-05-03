import { ExternalArrow } from "@/components/icons/ExternalArrow";

interface DeliverableItem {
  label: string;
  href: string;
  caption?: string;
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
          {items.map((item, i) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
