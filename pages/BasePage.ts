import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly baseUrl = 'https://humblehuman.vn';

  // Common header elements
  readonly logo: Locator;
  readonly searchIcon: Locator;
  readonly cartIcon: Locator;
  readonly accountIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a[href="/"]').first();
    this.searchIcon = page.locator('a[href="/search"]');
    this.cartIcon = page.locator('a[href="/cart"]');
    this.accountIcon = page.locator('a[href="/account"]');
  }

  async navigate(path: string = '') {
    await this.page.goto(`${this.baseUrl}${path}`);
  }

  async getTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async clickLogo() {
    await this.logo.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickSearch() {
    await this.searchIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCart() {
    await this.cartIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickAccount() {
    await this.accountIcon.click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async expectUrlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async expectElementVisible(selector: string) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async expectElementNotVisible(selector: string) {
    await expect(this.page.locator(selector)).not.toBeVisible();
  }

  async expectTextVisible(text: string) {
    await expect(this.page.getByText(text, { exact: false })).toBeVisible();
  }
}
