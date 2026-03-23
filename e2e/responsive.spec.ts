import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Responsive Screenshot Tests
 * 
 * Captures full-page screenshots of every page at 4 viewport widths.
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
  { name: 'desktop',       width: 1440, height: 900  },
  { name: 'small-desktop', width: 1279, height: 900  },  // just below max-xl
  { name: 'tablet',        width: 1023, height: 1024 },  // just below max-lg
  { name: 'mobile',        width: 767,  height: 1024 },  // just below max-md
  { name: 'small-mobile',  width: 375,  height: 812  },  // iPhone SE
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
        
        // Wait a beat for any CSS transitions / font loading
        await tab.waitForTimeout(500);
        
        // Full-page screenshot
        const screenshotPath = path.join(
          SCREENSHOT_DIR,
          `${page.name}-${viewport.name}.png`
        );
        await tab.screenshot({
          path: screenshotPath,
          fullPage: true,
        });
        
        // Basic sanity: page should not have horizontal overflow
        const bodyWidth = await tab.evaluate(() => document.body.scrollWidth);
        expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 1); // 1px tolerance
        
        await context.close();
      });
    }
  });
}
