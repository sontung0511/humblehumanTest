import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Empty cart state
  readonly emptyCartMessage: Locator;
  readonly continueShopping: Locator;
  readonly emptyCartImage: Locator;

  // Cart with items
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;
  readonly cartItemQuantities: Locator;
  readonly removeItemBtns: Locator;

  // Cart summary
  readonly subtotalLabel: Locator;
  readonly checkoutBtn: Locator;

  // Free shipping banner
  readonly freeShippingBanner: Locator;

  constructor(page: Page) {
    super(page);

    // Empty state
    this.emptyCartMessage = page.getByText('"Hổng" có gì trong giỏ hết');
    this.continueShopping = page.getByRole('link', { name: /Mua sắm ngay/i });
    this.emptyCartImage = page.locator('img[alt*="cart"]');

    // Cart items  
    this.cartItems = page.locator('[class*="cart-item"], [class*="cart__item"]');
    this.cartItemNames = page.locator('[class*="cart-item"] a, [class*="cart__item"] a');
    this.cartItemPrices = page.locator('[class*="cart-item"] [class*="price"], [class*="cart__item"] [class*="price"]');
    this.cartItemQuantities = page.locator('input[name="quantity"]');
    this.removeItemBtns = page.locator('button[name="minus"], [class*="remove"], a[href*="updates"]');

    // Summary
    this.subtotalLabel = page.getByText(/Tổng|Subtotal/i);
    this.checkoutBtn = page.getByRole('button', { name: /Thanh toán|Checkout/i });

    // Banner
    this.freeShippingBanner = page.getByText(/Freeship.*500/i);
  }

  async goto() {
    await this.navigate('/cart');
    await this.waitForPageLoad();
  }

  async expectEmptyCart() {
    await expect(this.emptyCartMessage).toBeVisible();
    await expect(this.continueShopping).toBeVisible();
  }

  async expectCartNotEmpty() {
    await expect(this.emptyCartMessage).not.toBeVisible();
    await expect(this.cartItems.first()).toBeVisible();
  }

  async expectFreeShippingBannerVisible() {
    await expect(this.freeShippingBanner).toBeVisible();
  }

  async clickContinueShopping() {
    await this.continueShopping.click();
    await this.waitForPageLoad();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
    await this.waitForPageLoad();
  }

  async expectCheckoutButtonVisible() {
    await expect(this.checkoutBtn).toBeVisible();
  }

  async expectCartUrlActive() {
    await expect(this.page).toHaveURL(/\/cart/);
  }
}
