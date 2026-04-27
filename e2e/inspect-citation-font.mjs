// Inspect computed font-family of mobile inline citations
import { chromium } from "playwright-core";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3007/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);

const result = await page.evaluate(() => {
  const sup = document.querySelector(".citation-sup");
  const a = document.querySelector(".citation");
  if (!sup || !a) return { error: "no citation found" };
  const supStyle = window.getComputedStyle(sup);
  const aStyle = window.getComputedStyle(a);
  return {
    "sup.font-family": supStyle.fontFamily,
    "sup.font-size":   supStyle.fontSize,
    "sup.line-height": supStyle.lineHeight,
    "sup.position":    supStyle.position,
    "sup.top":         supStyle.top,
    "sup.margin-left": supStyle.marginLeft,
    "a.font-family":   aStyle.fontFamily,
    "a.font-size":     aStyle.fontSize,
    "a.color":         aStyle.color,
    "viewport-width":  window.innerWidth,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
