import { ReactNode } from "react";
import { ScaledFrame } from "./ScaledFrame";

export type CardSize = "small" | "large";

type ChromeProps = {
  domain: string;
  title: string;
  description: string;
  cardSize: CardSize;
  children: ReactNode;
};

// Slack large unfurl: full-width image below text, ~496px image at site width.
// Slack small unfurl (Twitter `summary`): 75×75 right-aligned thumbnail.
export function SlackChrome({ domain, title, description, cardSize, children }: ChromeProps) {
  return (
    <div className="bg-white flex font-sans" style={{ width: 540 }}>
      <div className="bg-zinc-300 w-1 flex-shrink-0 rounded-l-sm" />
      <div className="flex-1 p-3 flex flex-col gap-1 min-w-0">
        <div
          className="text-zinc-500"
          style={{ fontSize: 12, lineHeight: 1.3 }}
        >
          {domain}
        </div>
        <div
          className="flex justify-between gap-3"
          style={{ alignItems: "flex-start" }}
        >
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div
              className="font-semibold text-zinc-900"
              style={{ fontSize: 15, lineHeight: 1.3 }}
            >
              {title}
            </div>
            <div
              className="text-zinc-600 line-clamp-2"
              style={{ fontSize: 13, lineHeight: 1.4 }}
            >
              {description}
            </div>
          </div>
          {cardSize === "small" && (
            <div className="flex-shrink-0 overflow-hidden rounded-sm" style={{ width: 75, height: 75 }}>
              <div
                className="w-full h-full overflow-hidden"
                style={{ width: 75, height: 75 }}
              >
                <ScaledFrame targetWidth={(75 * 1200) / 630}>{children}</ScaledFrame>
              </div>
            </div>
          )}
        </div>
        {cardSize === "large" && (
          <div className="mt-2 overflow-hidden rounded-sm border border-zinc-200">
            <ScaledFrame targetWidth={496}>{children}</ScaledFrame>
          </div>
        )}
      </div>
    </div>
  );
}

// LinkedIn post-link unfurl: full-bleed image at top, title + UPPERCASE domain underneath.
export function LinkedInChrome({ domain, title, children }: Omit<ChromeProps, "description" | "cardSize">) {
  return (
    <div
      className="bg-white border border-zinc-200 font-sans overflow-hidden"
      style={{ width: 552 }}
    >
      <div className="overflow-hidden">
        <ScaledFrame targetWidth={552}>{children}</ScaledFrame>
      </div>
      <div className="p-3 flex flex-col gap-1.5 bg-zinc-50">
        <div
          className="font-semibold text-zinc-900"
          style={{ fontSize: 16, lineHeight: 1.3 }}
        >
          {title}
        </div>
        <div
          className="text-zinc-500 uppercase"
          style={{ fontSize: 11, letterSpacing: "0.04em" }}
        >
          {domain}
        </div>
      </div>
    </div>
  );
}

// X (Twitter) summary_large_image: rounded card, full-bleed image with title overlay.
export function XChrome({ domain, title, children }: Omit<ChromeProps, "description" | "cardSize">) {
  return (
    <div
      className="bg-white border border-zinc-200 rounded-2xl overflow-hidden font-sans"
      style={{ width: 600 }}
    >
      <div className="relative overflow-hidden">
        <ScaledFrame targetWidth={600}>{children}</ScaledFrame>
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-white"
          style={{
            fontSize: 13,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </div>
      <div className="px-3 py-2">
        <div className="text-zinc-500" style={{ fontSize: 13 }}>
          From {domain}
        </div>
      </div>
    </div>
  );
}

// iMessage rich link bubble.
export function IMessageChrome({ domain, title, children }: Omit<ChromeProps, "description" | "cardSize">) {
  return (
    <div
      className="bg-zinc-100 overflow-hidden font-sans"
      style={{ width: 280, borderRadius: 18 }}
    >
      <div className="overflow-hidden">
        <ScaledFrame targetWidth={280}>{children}</ScaledFrame>
      </div>
      <div className="px-3 py-2 bg-zinc-50 flex flex-col gap-0.5">
        <div
          className="font-semibold text-zinc-900 truncate"
          style={{ fontSize: 12, lineHeight: 1.3 }}
        >
          {title}
        </div>
        <div className="text-zinc-500" style={{ fontSize: 11 }}>
          {domain}
        </div>
      </div>
    </div>
  );
}
