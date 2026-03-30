// AUTO-GENERATED — 2026-03-30T08:16:10.645Z
// Suite: Account & Login - Kiểm tra tài khoản và đăng nhập
// Source: login.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Account & Login - Kiểm tra tài khoản và đăng nhập', () => {

  test('TC_AUTH_001 — Trang đăng nhập hiển thị tùy chọn đăng nhập Google và Apple [smoke] [auth]', async ({ page }) => {
    await page.goto(BASE_URL + '/account/login');
    await expect(page.getByText('Tiếp tục với Google', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Tiếp tục với Apple', { exact: false }).first()).toBeVisible();
  });

  test('TC_AUTH_002 — Trang đăng nhập hiển thị form nhập Email [smoke] [auth]', async ({ page }) => {
    await page.goto(BASE_URL + '/account/login');
    await expect(page.getByText('Hoặc Email', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Tiếp tục', { exact: false }).first()).toBeVisible();
  });

  test('TC_AUTH_003 — Trang đăng nhập có link quay lại trang mua sắm [auth] [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/account/login');
    await expect(page.getByText('Quay lại và tiếp tục mua hàng', { exact: false }).first()).toBeVisible();
    await page.getByText('Quay lại và tiếp tục mua hàng', { exact: false }).first().click();
    await expect(page).toHaveURL(/humblehuman.vn/, { timeout: 15000 });
  });

  test('TC_AUTH_004 — Click icon Tài khoản trên header chuyển đến trang account [navigation] [auth]', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/account']`).first().click();
    await expect(page).toHaveURL(/\/account/, { timeout: 15000 });
  });

});
