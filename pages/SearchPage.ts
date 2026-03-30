import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;
  readonly pageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('input[name="q"], input[type="search"], input[placeholder*="tìm"]');
    this.searchResults = page.locator('a[href*="/products/"]');
    this.noResultsMessage = page.getByText('KHÔNG TÌM THẤY BẤT KỲ KẾT QUẢ NÀO', { exact: false });
    this.pageHeading = page.locator('h1').first();
  }

  async goto() {
    await this.navigate('/search');
    await this.waitForPageLoad();
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.waitForPageLoad();
  }

  async expectNoResultsMessage() {
    await expect(this.noResultsMessage).toBeVisible();
  }

  async expectResultsVisible() {
    await expect(this.searchResults.first()).toBeVisible();
  }

  async getResultCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async expectSearchUrl(keyword: string) {
    await expect(this.page).toHaveURL(new RegExp(`/search`));
  }
}
