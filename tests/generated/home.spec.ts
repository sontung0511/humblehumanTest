// AUTO-GENERATED — 2026-04-01T02:22:26.126Z
// Suite: Home Page - Kiểm tra trang chủ
// Source: home.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Home Page - Kiểm tra trang chủ', () => {

  test('TC_HOME_001 — Trang chủ load thành công và hiển thị đúng title [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await expect(page).toHaveTitle(/Humble Human/, { timeout: 15000 });
    await expect(page).toHaveURL(/humblehuman.vn/, { timeout: 15000 });
  });

  test('TC_HOME_002 — Header hiển thị icon Tìm kiếm, Tài khoản, Giỏ hàng [smoke] [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`a[href='/search']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/account']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HOME_003 — Banner quảng cáo \'Deal độc quyền\' hiển thị [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await expect(page.getByText('Deal độc quyền từ Online Store', { exact: false }).first()).toBeVisible();
  });

  test('TC_HOME_004 — Footer hiển thị thông tin bản quyền và số điện thoại [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.locator(`footer`).scrollIntoViewIfNeeded();
    await expect(page.getByText('Humble Human CO., LTD 2024', { exact: false }).first()).toBeVisible();
    await expect(page.locator(`a[href='tel:0703695777']`).first()).toBeVisible();
  });

  test('TC_HOME_005 — Click vào logo quay về trang chủ [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`a[href='/'] img, a.logo`).first().click();
    await expect(page).toHaveURL(/\//, { timeout: 15000 });
  });

  test('TC_HOME_006 — Link \'THAM GIA\' campaign hoạt động [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`a[href*='/pages/campaign']`).first()).toBeVisible();
    await page.locator(`a[href*='/pages/campaign']`).first().click();
    await expect(page).toHaveURL(/\/pages\/campaign/, { timeout: 15000 });
  });

});
