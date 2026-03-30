import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Product info
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;

  // Variant selectors
  readonly colorOptions: Locator;
  readonly sizeOptions: Locator;
  readonly sizeGuideLink: Locator;

  // Action buttons
  readonly addToCartBtn: Locator;
  readonly buyNowBtn: Locator;

  // Delivery options
  readonly deliveryOptionShipNhanh: Locator;
  readonly deliveryOptionPickup: Locator;

  // Quantity
  readonly quantityInput: Locator;
  readonly quantityIncrease: Locator;
  readonly quantityDecrease: Locator;

  // Upsell / Suggestions
  readonly suggestionSection: Locator;

  constructor(page: Page) {
    super(page);

    // Product info
    this.productTitle = page.locator('h1').first();
    this.productPrice = page.locator('[class*="price"]').first();
    this.productDescription = page.locator('[class*="description"], [id*="description"]').first();

    // Variant selectors — the site shows color/size as clickable labels
    this.colorOptions = page.locator('[class*="color"] label, [data-value][class*="color"]');
    this.sizeOptions = page.locator('[class*="size"] label:not(:has-text("Hướng dẫn")), label:has-text(" S "), label:has-text(" M "), label:has-text(" L ")');
    this.sizeGuideLink = page.getByText('Hướng dẫn chọn size');

    // Action buttons
    this.addToCartBtn = page.getByRole('button', { name: /THÊM VÀO GIỎ/i });
    this.buyNowBtn = page.getByRole('button', { name: /MUA NGAY/i });

    // Delivery
    this.deliveryOptionShipNhanh = page.getByText('Ship nhanh');
    this.deliveryOptionPickup = page.getByText('Lấy tại cửa hàng');

    // Quantity
    this.quantityInput = page.locator('input[name="quantity"]');
    this.quantityIncrease = page.locator('[class*="quantity"] button').last();
    this.quantityDecrease = page.locator('[class*="quantity"] button').first();

    // Suggestions
    this.suggestionSection = page.getByText('GỢI Ý DÀNH CHO BẠN');
  }

  async gotoProduct(productSlug: string) {
    await this.navigate(`/products/${productSlug}`);
    await this.waitForPageLoad();
  }

  async expectProductTitleVisible() {
    await expect(this.productTitle).toBeVisible();
  }

  async expectProductTitle(title: string) {
    await expect(this.productTitle).toContainText(title);
  }

  async expectPriceVisible() {
    await expect(this.productPrice).toBeVisible();
  }

  async selectColor(colorName: string) {
    await this.page.getByText(colorName, { exact: true }).first().click();
  }

  async selectSize(size: 'S' | 'M' | 'L' | 'XL' | string) {
    // Click size label that exactly matches size text
    await this.page.locator(`label:has-text("${size}")`).first().click();
  }

  async clickAddToCart() {
    await this.addToCartBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickBuyNow() {
    await this.buyNowBtn.click();
    await this.page.waitForLoadState('networkidle');
  }

  async setQuantity(qty: number) {
    await this.quantityInput.fill(String(qty));
  }

  async expectAddToCartEnabled() {
    await expect(this.addToCartBtn).toBeEnabled();
  }

  async expectAddToCartDisabled() {
    await expect(this.addToCartBtn).toBeDisabled();
  }

  async expectDeliveryOptionsVisible() {
    await expect(this.deliveryOptionShipNhanh).toBeVisible();
    await expect(this.deliveryOptionPickup).toBeVisible();
  }

  async expectSuggestionsVisible() {
    await expect(this.suggestionSection).toBeVisible();
  }

  async getProductTitle(): Promise<string> {
    return (await this.productTitle.textContent()) ?? '';
  }

  async getProductPrice(): Promise<string> {
    return (await this.productPrice.textContent()) ?? '';
  }
}
