import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Responsive Screenshot Tests
 * 
 * Captures full-page screenshots of every page at 5 viewport widths.
 * Screenshots are saved to e2e/screenshots/{page}-{breakpoint}.png
 * 
 * Usage:
 *   npm run build
 *   npx playwright test e2e/responsive.spec.ts
 * 
 * After running, review screenshots visually to check for:
 *   - Overflow / horizontal scrolling
 *   - Text truncation
 *   - Broken layouts
 *   - Elements that should stack but don't
 * 
 * For Claude Code: run this after responsive changes.
 * Feed specific screenshots back to Claude Code for visual debugging.
 */

const SCREENSHOT_DIR = path.join('e2e', 'screenshots');

const VIEWPORTS = [
  { name: 'desktop',       width: 1440, height: 900,  overflowMustPass: true  },
  { name: 'tablet',        width: 1023, height: 1024, overflowMustPass: true  },  // just below max-lg
  { name: 'mobile',        width: 767,  height: 1024, overflowMustPass: true  },  // just below max-md
  { name: 'small-mobile',  width: 375,  height: 812,  overflowMustPass: false },  // iPhone SE — warn only
];

const PAGES = [
  { name: 'landing',    path: '/'           },
  { name: 'skoala',     path: '/skoala'     },
  { name: 'teatime',    path: '/teatime'    },
  { name: 'nnspect',    path: '/nnspect'    },
  { name: 'sakurabook', path: '/sakurabook' },
];

// Ensure screenshot directory exists
test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }
});

for (const page of PAGES) {
  test.describe(`${page.name}`, () => {
    for (const viewport of VIEWPORTS) {
      test(`${viewport.name} (${viewport.width}px)`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        });
        const tab = await context.newPage();
        
        // Navigate and wait for network to settle
        await tab.goto(page.path, { waitUntil: 'networkidle' });
        
        // Wait for all images to actually load (or fail)
        // Much more reliable than a fixed timeout
        await tab.evaluate(async () => {
          const images = Array.from(document.querySelectorAll('img'));
          await Promise.allSettled(
            images.map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.addEventListener('load', resolve, { once: true });
                img.addEventListener('error', resolve, { once: true });
                // Safety timeout per image — don't wait forever
                setTimeout(resolve, 5000);
              });
            })
          );
        });
        
        // Extra beat for CSS reflow after images load
        await tab.waitForTimeout(300);
        
        // Full-page screenshot
        const screenshotPath = path.join(
          SCREENSHOT_DIR,
          `${page.name}-${viewport.name}.png`
        );
        await tab.screenshot({
          path: screenshotPath,
          fullPage: true,
        });
        
        // Check horizontal overflow
        const bodyWidth = await tab.evaluate(() => document.body.scrollWidth);
        const overflows = bodyWidth > viewport.width + 1;
        
        if (overflows && viewport.overflowMustPass) {
          // Hard fail — these breakpoints must not overflow
          expect(bodyWidth, 
            `Page "${page.name}" overflows at ${viewport.width}px — body is ${bodyWidth}px wide`
          ).toBeLessThanOrEqual(viewport.width + 1);
        } else if (overflows) {
          // Soft warning — screenshot captured for review, but test passes
          console.warn(
            `⚠️  "${page.name}" overflows at ${viewport.width}px (body: ${bodyWidth}px) — screenshot saved for review`
          );
        }
        
        await context.close();
      });
    }
  });
}