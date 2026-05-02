import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Next 16.2 compiles next.config.ts to ESM where __dirname is undefined.
// fileURLToPath(import.meta.url) gives the same dir without the ESM/CJS mismatch.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // output: 'export' removed — Vercel pre-renders static pages natively at build time with identical
  // CDN performance. Static export is incompatible with Keystatic's admin UI and API routes.
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: projectRoot,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
