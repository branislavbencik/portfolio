import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // output: 'export' removed — Vercel pre-renders static pages natively at build time with identical
  // CDN performance. Static export is incompatible with Keystatic's admin UI and API routes.
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
