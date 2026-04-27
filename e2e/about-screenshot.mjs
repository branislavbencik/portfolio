// One-shot screenshot of /about at desktop + mobile against the running dev server.
import { chromium } from "playwright-core";

const browser = await chromium.launch();
const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 375, height: 812 },
];

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  page.on("pageerror", (err) => console.error(`PAGE ERROR (${vp.name}):`, err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") console.error(`CONSOLE ERROR (${vp.name}):`, msg.text());
  });
  await page.goto("http://localhost:3001/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/about-${vp.name}.png`, fullPage: true });
  console.log(`OK /tmp/about-${vp.name}.png  ${vp.width}x${vp.height}`);
  await ctx.close();
}
await browser.close();
