import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Hero / Banner
  readonly heroBanner: Locator;
  readonly heroBannerTitle: Locator;
  readonly heroCampaignLink: Locator;

  // Navigation menu items
  readonly navShopAll: Locator;
  readonly navLifeStory: Locator;
  readonly navAboutUs: Locator;

  // Footer
  readonly footerLinks: Locator;
  readonly footerCopyright: Locator;
  readonly footerPhoneNumber: Locator;

  constructor(page: Page) {
    super(page);
    // Hero
    this.heroBanner = page.locator('.slider, [class*="slider"], [class*="banner"]').first();
    this.heroBannerTitle = page.getByText('Deal độc quyền từ Online Store');
    this.heroCampaignLink = page.locator('a[href*="/pages/campaign"]');

    // Nav
    this.navShopAll = page.locator('a[href="/collections/all"]').first();
    this.navLifeStory = page.locator('a[href*="/blogs/news"]').first();
    this.navAboutUs = page.locator('a[href*="/pages/about-us"]').first();

    // Footer
    this.footerLinks = page.locator('footer a');
    this.footerCopyright = page.getByText('Humble Human CO., LTD 2024');
    this.footerPhoneNumber = page.locator('a[href="tel:0703695777"]');
  }

  async goto() {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  async expectBannerVisible() {
    await expect(this.heroBannerTitle).toBeVisible();
  }

  async clickShopAll() {
    await this.navShopAll.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickLifeStory() {
    await this.navLifeStory.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAboutUs() {
    await this.navAboutUs.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectPageLoaded() {
    await expect(this.page).toHaveURL('https://humblehuman.vn/');
    await expect(this.page).toHaveTitle(/Humble Human/i);
  }

  async expectHeaderElementsVisible() {
    await expect(this.searchIcon).toBeVisible();
    await expect(this.cartIcon).toBeVisible();
  }

  async expectFooterVisible() {
    await expect(this.footerCopyright).toBeVisible();
    await expect(this.footerPhoneNumber).toBeVisible();
  }

  async getCartItemCount(): Promise<string> {
    const cartText = await this.cartIcon.textContent();
    return cartText ?? '0';
  }
}
