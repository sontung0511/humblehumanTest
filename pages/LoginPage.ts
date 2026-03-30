import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly googleLoginBtn: Locator;
  readonly appleLoginBtn: Locator;
  readonly emailInput: Locator;
  readonly continueBtn: Locator;
  readonly backToShoppingLink: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.googleLoginBtn = page.getByText(/Tiếp tục với Google/i);
    this.appleLoginBtn = page.getByText(/Tiếp tục với Apple/i);
    this.emailInput = page.locator('input[type="email"]');
    this.continueBtn = page.getByRole('button', { name: /Tiếp tục/i });
    this.backToShoppingLink = page.getByText(/Quay lại và tiếp tục mua hàng/i);
    this.pageHeading = page.locator('h1').first();
  }

  async goto() {
    await this.navigate('/account/login');
    await this.waitForPageLoad();
  }

  async expectLoginOptionsVisible() {
    await expect(this.googleLoginBtn).toBeVisible();
    await expect(this.appleLoginBtn).toBeVisible();
  }

  async clickGoogleLogin() {
    await this.googleLoginBtn.click();
  }

  async clickAppleLogin() {
    await this.appleLoginBtn.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async clickContinue() {
    await this.continueBtn.click();
    await this.waitForPageLoad();
  }

  async clickBackToShopping() {
    await this.backToShoppingLink.click();
    await this.waitForPageLoad();
  }

  async expectBackToShoppingVisible() {
    await expect(this.backToShoppingLink).toBeVisible();
  }

  async expectLoginPageUrl() {
    await expect(this.page).toHaveURL(/\/account(\/login)?/);
  }
}
