import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for responsive visual testing.
 * 
 * Usage:
 *   npm run build          # build static export first
 *   npx playwright test    # run all tests
 *   npx playwright test e2e/responsive.spec.ts  # responsive screenshots only
 * 
 * Screenshots saved to: e2e/screenshots/
 * 
 * The webServer config auto-serves the `out/` directory on port 3000.
 * Make sure `npm run build` has run before testing.
 */
export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/test-results',
  
  /* Don't run tests in parallel — sequential is fine for screenshots */
  fullyParallel: false,
  
  /* Fail fast */
  retries: 0,
  
  /* Reporter */
  reporter: 'list',

  /* Shared settings */
  use: {
    baseURL: 'http://localhost:3000',
    /* Collect screenshots on failure too */
    screenshot: 'only-on-failure',
  },

  /* Serve the static export */
  webServer: {
    command: 'npx serve out -l 3000 -s',
    port: 3000,
    reuseExistingServer: true,
  },

  /* We define viewports in the test file, not here — 
     this just needs one browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
