// Inspect line breaks around citations at small-mobile width
import { chromium } from "playwright-core";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3007/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const result = await page.evaluate(() => {
  const lede = document.querySelector(".type-lede");
  const supDisplay = window.getComputedStyle(document.querySelector(".citation-sup")).display;
  const sups = Array.from(document.querySelectorAll(".citation-sup"));
  // For each citation, get its bounding-box rect
  const positions = sups.map((sup) => {
    const r = sup.getBoundingClientRect();
    const aRect = sup.querySelector(".citation").getBoundingClientRect();
    return {
      label: sup.querySelector(".citation").textContent.trim(),
      sup_top: Math.round(r.top),
      sup_left: Math.round(r.left),
      sup_right: Math.round(r.right),
      sup_height: Math.round(r.height),
      a_top: Math.round(aRect.top),
      a_height: Math.round(aRect.height),
    };
  });
  return { sup_display: supDisplay, positions, lede_width: lede.getBoundingClientRect().width };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
