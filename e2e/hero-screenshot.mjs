// One-shot screenshot of hero across 4 viewports against the running dev server.
// Captures top 1100px of the landing page; saves to /tmp/hero-<viewport>.png.
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3007";
const VIEWPORTS = [
  { name: "desktop",      width: 1440, height: 900 },
  { name: "tablet",       width: 1023, height: 1024 },
  { name: "mobile",       width: 767,  height: 1024 },
  { name: "small-mobile", width: 375,  height: 812 },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const captureHeight = Math.min(vp.height, 1100);
  await page.screenshot({
    path: `/tmp/hero-${vp.name}.png`,
    clip: { x: 0, y: 0, width: vp.width, height: captureHeight },
  });
  console.log(`OK /tmp/hero-${vp.name}.png  ${vp.width}x${captureHeight}`);
  await ctx.close();
}
await browser.close();
