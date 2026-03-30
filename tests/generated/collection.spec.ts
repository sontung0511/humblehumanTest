// AUTO-GENERATED — 2026-03-30T08:16:10.644Z
// Suite: Collection Page - Kiểm tra trang danh mục sản phẩm
// Source: collection.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Collection Page - Kiểm tra trang danh mục sản phẩm', () => {

  test('TC_COL_001 — Trang \'Shop All\' load và hiển thị heading \'Cửa hàng\' [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`h1`).first()).toContainText('Cửa hàng');
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
  });

  test('TC_COL_002 — Trang danh mục hiển thị ít nhất 1 sản phẩm [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    const count_r5qf = await page.locator(`a[href*='/products/']`).count();
    expect(count_wrvy).toBeGreaterThanOrEqual(1);
  });

  test('TC_COL_003 — Menu điều hướng sang các danh mục: Áo, Quần, Túi, Nón [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`a[href='/collections/ao']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/collections/quan']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/collections/tui']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/collections/non']`).first()).toBeVisible();
  });

  test('TC_COL_004 — Click vào danh mục \'Áo Khoác\' hiển thị đúng trang [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`a[href='/collections/ao-khoac']`).first().click();
    await expect(page).toHaveURL(/\/collections\/ao-khoac/, { timeout: 15000 });
  });

  test('TC_COL_005 — Click vào sản phẩm đầu tiên chuyển đến trang chi tiết sản phẩm [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`a[href*='/products/']`).first().click();
    await expect(page).toHaveURL(/\/products\//, { timeout: 15000 });
    await expect(page.locator(`h1`).first()).toBeVisible();
  });

  test('TC_COL_006 — Phân trang hoạt động - kiểm tra nút sang trang 2 [pagination]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`a[href*='?page=2']`).first()).toBeVisible();
    await page.locator(`a[href*='?page=2']`).first().click();
    await expect(page).toHaveURL(/page=2/, { timeout: 15000 });
  });

  test('TC_COL_007 — Trang danh mục \'Nón\' load đúng [regression]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/non');
    await expect(page).toHaveURL(/\/collections\/non/, { timeout: 15000 });
    await expect(page.locator(`h1`).first()).toBeVisible();
  });

});
