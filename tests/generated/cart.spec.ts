// AUTO-GENERATED — 2026-04-01T02:22:26.123Z
// Suite: Cart Page - Kiểm tra trang giỏ hàng
// Source: cart.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Cart Page - Kiểm tra trang giỏ hàng', () => {

  test('TC_CART_001 — Giỏ hàng trống hiển thị thông báo đúng [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/cart');
    await expect(page).toHaveURL(/\/cart/, { timeout: 15000 });
    await expect(page.getByText('Hổng', { exact: false }).first()).toBeVisible();
  });

  test('TC_CART_002 — Giỏ hàng trống hiển thị nút \'Mua sắm ngay\' [smoke] [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/cart');
    await expect(page.locator(`a[href='/collections/all']`).first()).toBeVisible();
    await expect(page.getByText('Mua sắm ngay', { exact: false }).first()).toBeVisible();
  });

  test('TC_CART_003 — Banner freeship hiển thị khi giỏ hàng trống [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/cart');
    await expect(page.getByText('Freeship', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('500.000', { exact: false }).first()).toBeVisible();
  });

  test('TC_CART_004 — Click \'Mua sắm ngay\' từ giỏ hàng trống chuyển về trang shop [navigation]', async ({ page }) => {
    await page.goto(BASE_URL + '/cart');
    await page.locator(`a[href='/collections/all']`).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
  });

  test('TC_CART_005 — Thêm sản phẩm vào giỏ và kiểm tra giỏ hàng có hàng [cart] [regression]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await page.getByText('THÊM VÀO GIỎ', { exact: false }).first().click();
    await page.waitForURL(/\/cart/);
    await expect(page).toHaveURL(/\/cart/, { timeout: 15000 });
  });

  test('TC_CART_006 — Số lượng sản phẩm trên header cart icon cập nhật sau khi thêm hàng [cart]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await page.getByText('THÊM VÀO GIỎ', { exact: false }).first().click();
    await page.waitForURL(/\/cart/);
    await expect(page.getByText('1 sản phẩm', { exact: false }).first()).toBeVisible();
  });

});
