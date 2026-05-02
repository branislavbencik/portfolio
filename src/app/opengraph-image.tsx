import { ImageResponse } from "next/og";
import { loadGeistBold } from "@/lib/og-fonts";

export const alt = "Branislav Benčík";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// V1 ultra-minimal: wordmark only, 40px, left-aligned, vertically centered, on canvas.
// Locked 2026-05-02 after playground iteration. Same OG image is served for every route
// via Next 16's metadata-file colocation; brand recall over per-route differentiation.
// Satori (the engine behind ImageResponse) doesn't run Tailwind or read CSS variables,
// so values are inlined here. Source-of-truth values mirror src/app/globals.css:35-44
// (--canvas, --text-primary) and src/app/playground/og-preview/variants/V1Wordmark.tsx.
export default async function OpengraphImage() {
  const geistBold = await loadGeistBold();

  return new ImageResponse(
    (
      <div
        style={{ // audit-ignore — Satori requires inline styles; Tailwind/CSS-vars don't run here
          width: "100%",
          height: "100%",
          background: "#FAFAFA", // audit-ignore — Satori can't read CSS vars; mirrors --canvas
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 64,
        }}
      >
        <div
          style={{ // audit-ignore — Satori requires inline styles; Tailwind/CSS-vars don't run here
            fontFamily: "Geist",
            fontWeight: 700,
            fontSize: 40,
            color: "#18181B", // audit-ignore — Satori can't read CSS vars; mirrors --text-primary
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Branislav Benčík
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Geist", data: geistBold, style: "normal", weight: 700 }],
    }
  );
}
