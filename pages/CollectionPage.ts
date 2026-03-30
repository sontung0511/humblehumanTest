import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CollectionPage extends BasePage {
  // Filter sidebar categories
  readonly filterAll: Locator;

  // Product grid items
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;

  // Pagination
  readonly nextPageBtn: Locator;
  readonly paginationLinks: Locator;

  // Category header
  readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.filterAll = page.locator('a[href="/collections/all"]').first();
    this.productItems = page.locator('.product-item, [class*="product-item"], .product-card').first();
    this.productNames = page.locator('.product-item a, [class*="product"] a[href*="/products/"]');
    this.productPrices = page.locator('[class*="price"]');
    this.nextPageBtn = page.locator('a[href*="?page=2"], a:has-text("›")').first();
    this.paginationLinks = page.locator('[class*="pagination"] a, a[href*="?page="]');
    this.pageHeading = page.locator('h1').first();
  }

  async gotoShopAll() {
    await this.navigate('/collections/all');
    await this.waitForPageLoad();
  }

  async gotoCollection(collectionSlug: string) {
    await this.navigate(`/collections/${collectionSlug}`);
    await this.waitForPageLoad();
  }

  async expectPageHeading(text: string) {
    await expect(this.pageHeading).toContainText(text);
  }

  async getProductCount(): Promise<number> {
    return await this.productNames.count();
  }

  async clickFirstProduct() {
    const firstProduct = this.page.locator('a[href*="/products/"]').first();
    await firstProduct.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickProductByName(name: string) {
    await this.page.locator(`a:has-text("${name}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectProductsVisible() {
    await expect(this.page.locator('a[href*="/products/"]').first()).toBeVisible();
  }

  async expectCollectionUrlContains(slug: string) {
    await expect(this.page).toHaveURL(new RegExp(`/collections/${slug}`));
  }

  async clickCategoryFilter(category: 'all' | 'ao-khoac' | 'ao' | 'quan' | 'tui' | 'non') {
    await this.page.locator(`a[href="/collections/${category}"]`).first().click();
    await this.waitForPageLoad();
  }
}
