import { ExternalArrow } from "./icons/ExternalArrow";
import { GithubMark } from "./icons/GithubMark";
import { DocumentMark } from "./icons/DocumentMark";

type DeliverableIcon = "external" | "github" | "document";

export interface Deliverable {
  label: string;
  url: string;
  icon?: DeliverableIcon;
}

interface DeliverablesRowProps {
  items: readonly Deliverable[];
}

function IconFor({ icon }: { icon: DeliverableIcon }) {
  if (icon === "github") return <GithubMark size={16} />;
  if (icon === "document") return <DocumentMark size={16} />;
  return <ExternalArrow size={16} className="" />;
}

export function DeliverablesRow({ items }: DeliverablesRowProps) {
  const visible = items.filter((item) => item.url && item.url.trim() && item.label && item.label.trim());
  if (visible.length === 0) return null;

  return (
    <nav
      aria-label="Project deliverables"
      className="w-full max-w-figure mx-auto px-content-x"
    >
      <ul className="flex flex-wrap gap-3">
        {visible.map((item) => (
          <li key={`${item.label}-${item.url}`} className="flex-1 basis-[180px]">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.label} (opens in new tab)`}
              className="group flex items-center gap-3 px-[18px] py-[14px] border border-surface-3 text-text-primary no-underline motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out hover:border-text-primary focus-visible:border-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas" // audit-ignore: 14/18 px padding is the positioning.md Variant A spec
            >
              <span className="text-text-primary inline-flex">
                <IconFor icon={item.icon ?? "external"} />
              </span>
              <span className="type-allcaps">{item.label}</span>
              <span className="ml-auto text-text-tertiary group-hover:text-text-primary motion-safe:transition-colors motion-safe:duration-200">
                <ExternalArrow size={14} className="" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
