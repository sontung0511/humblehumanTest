// AUTO-GENERATED — 2026-04-01T02:22:26.127Z
// Suite: Search & Navigation - Kiểm tra tìm kiếm và điều hướng
// Source: search.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Search & Navigation - Kiểm tra tìm kiếm và điều hướng', () => {

  test('TC_SRCH_001 — Trang tìm kiếm load đúng với heading [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/search');
    await expect(page).toHaveURL(/\/search/, { timeout: 15000 });
    await expect(page.getByText('Nhập từ khóa để tìm kiếm', { exact: false }).first()).toBeVisible();
  });

  test('TC_SRCH_002 — Tìm kiếm từ khóa không tồn tại hiển thị thông báo không có kết quả [search]', async ({ page }) => {
    await page.goto(BASE_URL + '/search');
    await page.locator(`input[name='q']`).fill('xyznotexists12345');
    await page.locator(`input[name='q']`).press('Enter');
    await expect(page.getByText('KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO', { exact: false }).first()).toBeVisible();
  });

  test('TC_SRCH_003 — Tìm kiếm từ khóa \'áo\' trả về kết quả sản phẩm [search]', async ({ page }) => {
    await page.goto(BASE_URL + '/search');
    await page.locator(`input[name='q']`).fill('áo');
    await page.locator(`input[name='q']`).press('Enter');
    const count_kv7x = await page.locator(`a[href*='/products/']`).count();
    expect(count_6oe9).toBeGreaterThanOrEqual(1);
  });

  test('TC_SRCH_004 — Click icon tìm kiếm trên header mở trang search [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/search']`).first().click();
    await expect(page).toHaveURL(/\/search/, { timeout: 15000 });
  });

  test('TC_NAV_001 — Navigation: Home → Shop All → About Us [navigation] [regression]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/collections/all']`).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
    await page.locator(`a[href*='/pages/about-us']`).first().click();
    await expect(page).toHaveURL(/\/pages\/about-us/, { timeout: 15000 });
  });

  test('TC_NAV_002 — Navigation: Trang Life Story (blogs/news) load đúng [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/blogs/news');
    await expect(page).toHaveURL(/\/blogs\/news/, { timeout: 15000 });
  });

});
