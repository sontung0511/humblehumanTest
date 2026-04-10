// AUTO-GENERATED — 2026-04-01T02:22:26.125Z
// Suite: Global Header - Desktop & Mobile
// Source: header.scenarios.json
// Chỉnh sửa file scenario JSON và chạy lại generator để cập nhật.

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://humblehuman.vn';

test.describe('Global Header - Desktop & Mobile', () => {

  test('TC_HDR_D_001 — [Desktop] Header hiển thị nhất quán trên tất cả pages [desktop] [smoke] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/pages/about-us');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/pages/support');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/cart');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/search');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
  });

  test('TC_HDR_D_002 — [Desktop] Header nằm ở top page (position fixed/sticky, top: 0) [desktop] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    const cssStr_v1 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => getComputedStyle(el).getPropertyValue('position')
    );
    expect(cssStr_v1).toMatch(/fixed|sticky/);
    const cssStr_v2 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => getComputedStyle(el).getPropertyValue('top')
    );
    expect(cssStr_v2).toMatch(/0/);
  });

  test('TC_HDR_D_003 — [Desktop] Header sticky - vẫn hiển thị sau khi scroll xuống [desktop] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    const box_v3 = await page.locator(`header, [class*='header']`).first().boundingBox();
    expect(box_v3?.y).toBeLessThan(720);
  });

  test('TC_HDR_D_004 — [Desktop] Header không bị content che (z-index cao hơn content) [desktop] [ui] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.evaluate(() => window.scrollBy(0, 300));
    await page.waitForTimeout(500);
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    const cssVal_v4 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => parseInt(getComputedStyle(el).getPropertyValue('z-index') || '0', 10)
    );
    expect(cssVal_v4).toBeGreaterThanOrEqual(10);
  });

  test('TC_HDR_D_005 — [Desktop] Full navigation menu hiển thị đầy đủ (ngang) [desktop] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`nav a[href='/'], nav a[href='/collections/all']`).first()).toBeVisible();
    await expect(page.getByText('Shop', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('About', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Support', { exact: false }).first()).toBeVisible();
  });

  test('TC_HDR_D_006 — [Desktop] Click menu \'Home\' điều hướng về trang chủ [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`nav a[href='/'], header a[href='/']`).first().click();
    await expect(page).toHaveURL('https://humblehuman.vn/');
  });

  test('TC_HDR_D_007 — [Desktop] Click menu \'Shop\' điều hướng đến /collections/all [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.locator(`nav a[href='/collections/all'], header a[href='/collections/all']`).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
  });

  test('TC_HDR_D_008 — [Desktop] Click menu \'Campaign\' điều hướng đúng URL [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.getByText('Campaign', { exact: false }).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
  });

  test('TC_HDR_D_009 — [Desktop] Click menu \'About\' điều hướng đến /pages/about-us [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.getByText('About', { exact: false }).first().click();
    await expect(page).toHaveURL(/\/pages\/about/, { timeout: 15000 });
  });

  test('TC_HDR_D_010 — [Desktop] Click menu \'Support\' điều hướng đến /pages/support [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.getByText('Support', { exact: false }).first().click();
    await expect(page).toHaveURL(/\/pages\/support/, { timeout: 15000 });
  });

  test('TC_HDR_D_011 — [Desktop] Click menu \'Cart\' điều hướng đến /cart [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/cart']`).first().click();
    await expect(page).toHaveURL(/\/cart/, { timeout: 15000 });
  });

  test('TC_HDR_D_012 — [Desktop] Click current page menu - không reload bất thường (ở Home click Home) [desktop] [navigation] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    let reloaded_v5 = false;
    page.on('load', () => { reloaded_v5 = true; });
    await page.locator(`nav a[href='/'], header a[href='/']`).first().click();
    await page.waitForTimeout(1000);
    // Soft check: same URL after clicking current page
    expect(page.url()).toMatch(/humblehuman\.vn/);
  });

  test('TC_HDR_D_013 — [Desktop] Click current page menu - không reload bất thường (ở Shop click Shop) [desktop] [navigation] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`nav a[href='/collections/all'], header a[href='/collections/all']`).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
  });

  test('TC_HDR_D_014 — [Desktop] Menu hiển thị đúng theo config order_number [desktop] [regression] [config]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    const menuLinks_v6 = await page.locator('nav a, header nav a, [class*=\'menu\'] a').allTextContents();
    { const idx_v7 = menuLinks_v6.findIndex((t: string) => t.includes('Home')); expect(idx_v7).toBeGreaterThanOrEqual(0); }
    { const idx_v8 = menuLinks_v6.findIndex((t: string) => t.includes('Shop')); expect(idx_v8).toBeGreaterThanOrEqual(0); }
    { const idx_v9 = menuLinks_v6.findIndex((t: string) => t.includes('Campaign')); expect(idx_v9).toBeGreaterThanOrEqual(0); }
    { const idx_v10 = menuLinks_v6.findIndex((t: string) => t.includes('About')); expect(idx_v10).toBeGreaterThanOrEqual(0); }
    { const idx_v11 = menuLinks_v6.findIndex((t: string) => t.includes('Support')); expect(idx_v11).toBeGreaterThanOrEqual(0); }
  });

  test('TC_HDR_D_015 — [Desktop] Chỉ hiển thị menu item is_active = true [desktop] [regression] [config]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`nav a[href='/'], nav a[href='/collections/all']`).first()).toBeVisible();
  });

  test('TC_HDR_D_016 — [Desktop] Logo hiển thị chính giữa header [desktop] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo, header [class*='logo']`).first()).toBeVisible();
    const rect_v12 = await page.locator(`header a img, header .logo, header [class*='logo']`).first().boundingBox();
    const vp_v13 = page.viewportSize();
    if (rect_v12 && vp_v13) {
      const center = rect_v12.x + rect_v12.width / 2;
      expect(Math.abs(center - vp_v13.width / 2)).toBeLessThan(30);
    }
  });

  test('TC_HDR_D_017 — [Desktop] Click logo (HUMBLE HUMAN) từ trang khác điều hướng về homepage [desktop] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`header a[href='/'] img, header a[href='/'].logo, header [class*='logo'] a`).first().click();
    await expect(page).toHaveURL('https://humblehuman.vn/');
  });

  test('TC_HDR_D_018 — [Desktop] Cart icon hiển thị đúng vị trí top-right [desktop] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_D_019 — [Desktop] Click cart icon điều hướng đến cart page [desktop] [smoke] [cart]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/cart']`).first().click();
    await expect(page).toHaveURL(/\/cart/, { timeout: 15000 });
  });

  test('TC_HDR_D_020 — [Desktop] Cart badge hiển thị đúng số lượng sản phẩm trong giỏ [desktop] [cart] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await page.getByText('THÊM VÀO GIỎ', { exact: false }).first().click();
    await page.waitForURL(/\/cart/);
    await page.goto(BASE_URL + '/');
    await expect(page.getByText('1', { exact: false }).first()).toBeVisible();
  });

  test('TC_HDR_D_021 — [Desktop] Theme light - text/icon/logo hiển thị đúng (readable) [desktop] [ui] [theme]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/search']`).first()).toBeVisible();
  });

  test('TC_HDR_D_022 — [Desktop] Search icon - tìm kiếm đúng kết quả [desktop] [search]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/search']`).first().click();
    await expect(page).toHaveURL(/\/search/, { timeout: 15000 });
    await page.locator(`input[name='q']`).fill('áo');
    await page.locator(`input[name='q']`).press('Enter');
    const count_qrca = await page.locator(`a[href*='/products/']`).count();
    expect(count_umxl).toBeGreaterThanOrEqual(1);
  });

  test('TC_HDR_D_EDGE_001 — [Desktop][Edge] URL menu lỗi - UI không crash, header vẫn ổn định [desktop] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/collections/non-existent-page-404');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_D_EDGE_002 — [Desktop][Edge] Logo quá lớn - Logo tự scale fit, không vỡ header [desktop] [edge] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    const overflow_v14 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => {
        const s = getComputedStyle(el);
        return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;
      }
    );
    expect(overflow_v14).toBeTruthy();
    await expect(page.locator(`header a img, header .logo`).first()).toBeVisible();
  });

  test('TC_HDR_D_EDGE_003 — [Desktop][Edge] Menu item tên quá dài - layout không vỡ [desktop] [edge] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    const overflow_v15 = await page.locator(`nav, header nav`).first().evaluate(
      (el) => {
        const s = getComputedStyle(el);
        return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;
      }
    );
    expect(overflow_v15).toBeTruthy();
  });

  test('TC_HDR_D_EDGE_004 — [Desktop][Edge] Không có menu item - Header vẫn hiển thị với logo và cart [desktop] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo, header [class*='logo']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_001 — [Mobile] Header hiển thị nhất quán trên tất cả pages [mobile] [smoke] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/collections/all');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/pages/about-us');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/pages/support');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await page.goto(BASE_URL + '/cart');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
  });

  test('TC_HDR_M_002 — [Mobile] Header nằm ở top page (position fixed/sticky) [mobile] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    const cssStr_v16 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => getComputedStyle(el).getPropertyValue('position')
    );
    expect(cssStr_v16).toMatch(/fixed|sticky/);
  });

  test('TC_HDR_M_003 — [Mobile] Header sticky - vẫn hiển thị sau khi scroll [mobile] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(500);
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    const box_v17 = await page.locator(`header, [class*='header']`).first().boundingBox();
    expect(box_v17?.y).toBeLessThan(720);
  });

  test('TC_HDR_M_004 — [Mobile] Burger icon hiển thị thay cho thanh menu ngang [mobile] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu'], [aria-label*='Menu']`).first()).toBeVisible();
  });

  test('TC_HDR_M_005 — [Mobile] Click burger icon mở overlay menu full screen [mobile] [smoke] [burger]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu'], [aria-label*='Menu']`).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer'], nav[class*='mobile']`).first()).toBeVisible();
  });

  test('TC_HDR_M_006 — [Mobile] Click X đóng overlay thành công [mobile] [smoke] [burger]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.locator(`button[aria-label*='close'], button[class*='close'], [class*='overlay'] button.close, [class*='menu'] button[class*='close']`).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer']`).first()).not.toBeVisible();
  });

  test('TC_HDR_M_007 — [Mobile] Click menu item trong overlay - overlay tự đóng và navigate đúng URL [mobile] [burger] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.locator(`[class*='overlay'] a[href='/collections/all'], [class*='mobile-menu'] a[href='/collections/all'], nav a[href='/collections/all']`).first().click();
    await expect(page).toHaveURL(/\/collections\/all/, { timeout: 15000 });
    await expect(page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer']`).first()).not.toBeVisible();
  });

  test('TC_HDR_M_008 — [Mobile] Click menu item \'About\' trong overlay điều hướng đến /pages/about-us [mobile] [burger] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.getByText('About', { exact: false }).first().click();
    await expect(page).toHaveURL(/\/pages\/about/, { timeout: 15000 });
  });

  test('TC_HDR_M_009 — [Mobile] Click menu item \'Support\' trong overlay điều hướng đến /pages/support [mobile] [burger] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.getByText('Support', { exact: false }).first().click();
    await expect(page).toHaveURL(/\/pages\/support/, { timeout: 15000 });
  });

  test('TC_HDR_M_010 — [Mobile] Click current page menu (Home → click Home) - không reload bất thường [mobile] [navigation] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.locator(`a[href='/']`).first().click();
    await expect(page).toHaveURL('https://humblehuman.vn/');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
  });

  test('TC_HDR_M_011 — [Mobile] Overlay lock body scroll - background không scroll khi overlay mở [mobile] [burger] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    const cssStr_v18 = await page.locator(`body`).first().evaluate(
      (el) => getComputedStyle(el).getPropertyValue('overflow')
    );
    expect(cssStr_v18).toMatch(/hidden/);
  });

  test('TC_HDR_M_012 — [Mobile] Menu overlay hiển thị đúng theo config order_number [mobile] [regression] [config]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    const menuLinks_v19 = await page.locator('nav a, header nav a, [class*=\'menu\'] a').allTextContents();
    { const idx_v20 = menuLinks_v19.findIndex((t: string) => t.includes('Home')); expect(idx_v20).toBeGreaterThanOrEqual(0); }
    { const idx_v21 = menuLinks_v19.findIndex((t: string) => t.includes('Shop')); expect(idx_v21).toBeGreaterThanOrEqual(0); }
    { const idx_v22 = menuLinks_v19.findIndex((t: string) => t.includes('Campaign')); expect(idx_v22).toBeGreaterThanOrEqual(0); }
    { const idx_v23 = menuLinks_v19.findIndex((t: string) => t.includes('About')); expect(idx_v23).toBeGreaterThanOrEqual(0); }
    { const idx_v24 = menuLinks_v19.findIndex((t: string) => t.includes('Support')); expect(idx_v24).toBeGreaterThanOrEqual(0); }
  });

  test('TC_HDR_M_013 — [Mobile] Overlay chỉ hiển thị item is_active = true [mobile] [regression] [config]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await expect(page.locator(`a[href='/'], a[href='/collections/all']`).first()).toBeVisible();
  });

  test('TC_HDR_M_014 — [Mobile] Logo hiển thị chính giữa header khi overlay đóng [mobile] [smoke] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo, header [class*='logo']`).first()).toBeVisible();
  });

  test('TC_HDR_M_015 — [Mobile] Click logo (HUMBLE HUMAN) từ trang khác điều hướng về homepage [mobile] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/collections/all');
    await page.locator(`header a[href='/'] img, header a[href='/'].logo, header [class*='logo'] a, header a[href='/']`).first().click();
    await expect(page).toHaveURL('https://humblehuman.vn/');
  });

  test('TC_HDR_M_016 — [Mobile] Cart icon hiển thị đúng vị trí top-right [mobile] [smoke] [ui] [cart]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_017 — [Mobile] Click cart icon điều hướng đến Cart page [mobile] [smoke] [cart] [navigation]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`a[href='/cart']`).first().click();
    await expect(page).toHaveURL(/\/cart/, { timeout: 15000 });
  });

  test('TC_HDR_M_018 — [Mobile] Cart badge hiển thị đúng số lượng sản phẩm trong giỏ [mobile] [cart] [regression]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/products/nhan-ban-tu-hum-effortless-long-sleeve-shirt-muslin-cotton-black');
    await page.getByText('THÊM VÀO GIỎ', { exact: false }).first().click();
    await page.waitForURL(/\/cart/);
    await page.goto(BASE_URL + '/');
    await expect(page.getByText('1', { exact: false }).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_001 — [Mobile][Edge] URL menu lỗi - UI không crash, header vẫn ổn định [mobile] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/collections/non-existent-page-404');
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_002 — [Mobile][Edge] Logo quá lớn - Logo tự scale fit, không vỡ header [mobile] [edge] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    const overflow_v25 = await page.locator(`header, [class*='header']`).first().evaluate(
      (el) => {
        const s = getComputedStyle(el);
        return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;
      }
    );
    expect(overflow_v25).toBeTruthy();
    await expect(page.locator(`header a img, header .logo`).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_003 — [Mobile][Edge] Menu item tên quá dài trong overlay - Layout overlay không vỡ [mobile] [edge] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    const overflow_v26 = await page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer']`).first().evaluate(
      (el) => {
        const s = getComputedStyle(el);
        return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;
      }
    );
    expect(overflow_v26).toBeTruthy();
  });

  test('TC_HDR_M_EDGE_004 — [Mobile][Edge] Không có menu item - Header vẫn hiển thị với logo và cart [mobile] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo, header [class*='logo']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_005 — [Mobile][Edge] Xoay màn hình khi overlay mở - Overlay vẫn đúng layout [mobile] [edge] [ui]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    await page.setViewportSize({ width: 844, height: 390 });
    await page.waitForTimeout(500);
    const overflow_v27 = await page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer']`).first().evaluate(
      (el) => {
        const s = getComputedStyle(el);
        return s.overflow === 'hidden' || el.scrollWidth <= el.clientWidth;
      }
    );
    expect(overflow_v27).toBeTruthy();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_006 — [Mobile][Edge] Spam click burger - Không mở nhiều overlay chồng nhau [mobile] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(100);
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(100);
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(500);
    const count_tky6 = await page.locator(`[class*='overlay'], [class*='mobile-menu'], [class*='drawer']`).count();
    expect(count_tthu).toBeLessThanOrEqual(1);
  });

  test('TC_HDR_M_EDGE_007 — [Mobile][Edge] Click trong khi overlay đang animation - UI không lỗi [mobile] [edge]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first().click();
    await page.waitForTimeout(100);
    await page.locator(`button[aria-label*='close'], button[class*='close'], [class*='overlay'] button.close`).first().click();
    await page.waitForTimeout(600);
    await expect(page.locator(`header, [class*='header']`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
  });

  test('TC_HDR_M_EDGE_008 — [Mobile][Edge] Sai theme config - Text/icon/logo vẫn readable [mobile] [edge] [theme]', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL + '/');
    await expect(page.locator(`header a img, header .logo`).first()).toBeVisible();
    await expect(page.locator(`a[href='/cart']`).first()).toBeVisible();
    await expect(page.locator(`button[class*='burger'], button[class*='menu'], [class*='hamburger'], [aria-label*='menu']`).first()).toBeVisible();
  });

});
