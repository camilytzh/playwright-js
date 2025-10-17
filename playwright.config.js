const { defineConfig, devices } = require('@playwright/test');

export default defineConfig({
  testDir: './tests',
  retries: 1,
  use: {
    baseURL: 'https://practicesoftwaretesting.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',       
    trace: 'on-first-retry',
  },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'always' }]],
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } }
  ],
});
