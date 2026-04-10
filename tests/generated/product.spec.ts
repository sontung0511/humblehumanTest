// AUTO-GENERATED — 2026-04-01T02:22:26.126Z
// Suite: Product Page - Kiểm tra trang chi tiết sản phẩm
// Source: product.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Product Page - Kiểm tra trang chi tiết sản phẩm', () => {

  test('TC_PRD_001 — Trang sản phẩm load và hiển thị tên sản phẩm [smoke]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.locator(`h1`).first()).toBeVisible();
    await expect(page.getByText('Muslin Cotton', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_002 — Giá sản phẩm hiển thị đúng (có ký tự ₫) [smoke] [pricing]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('580,000', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_003 — Các tùy chọn màu sắc hiển thị (Đen, Xanh Bọt Biển) [ui] [variants]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('MÀU SẮC', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Đen', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_004 — Các tùy chọn kích thước hiển thị (S, M, L) [ui] [variants]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('KÍCH THƯỚC', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('L', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('M', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('S', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_005 — Nút \'THÊM VÀO GIỎ\' hiển thị trên trang sản phẩm [smoke] [cart]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('THÊM VÀO GIỎ', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_006 — Nút \'MUA NGAY\' hiển thị trên trang sản phẩm [smoke] [cart]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('MUA NGAY', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_007 — Tùy chọn giao hàng \'Ship nhanh\' và \'Lấy tại cửa hàng\' hiển thị [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('GIAO HÀNG', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Ship nhanh', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Lấy tại cửa hàng', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_008 — Mô tả sản phẩm hiển thị nội dung [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('MÔ TẢ SẢN PHẨM', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Muslin Cotton', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_009 — Khu vực gợi ý sản phẩm \'GỢI Ý DÀNH CHO BẠN\' hiển thị [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await page.locator(`a[href*='/collections/ao']`).scrollIntoViewIfNeeded();
    await expect(page.getByText('GỢI Ý DÀNH CHO BẠN', { exact: false }).first()).toBeVisible();
  });

  test('TC_PRD_010 — Link \'Hướng dẫn chọn size\' hiển thị [ui]', async ({ page }) => {
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await expect(page.getByText('Hướng dẫn chọn size', { exact: false }).first()).toBeVisible();
  });

});
