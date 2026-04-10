import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Number of workers */
  workers: 1,
  /* Reporter to use */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  /* Shared settings for all projects */
  use: {
    baseURL: 'https://humblehuman.vn',
    /* Hiện browser khi chạy test — đặt thành true để thấy trình duyệt thao tác */
    headless: false,
    /* Làm chậm mỗi action (ms) để dễ quan sát — đặt 0 nếu muốn chạy nhanh */
    // slowMo: 500,
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    /* Default timeout */
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    /* Viewport */
    viewport: { width: 1280, height: 720 },
    /* Locale */
    locale: 'vi-VN',
  },
  /* Test timeout */
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  /* Output folder for test artifacts */
  outputDir: 'test-results/',
});
