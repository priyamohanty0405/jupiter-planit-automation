import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Key locators on home page
  readonly logo: Locator;
  readonly startShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.logo = page.locator('h1', { hasText: 'Jupiter Toys' });
    this.startShoppingButton = page.getByRole('link', { name: 'Start Shopping' });
  }

  // Navigate to home page
  async navigateToHomePage() {
    await this.page.goto(`${process.env.BASE_URL}`);
    await expect(this.page).toHaveTitle(/Jupiter/);
  }

  // Verify page is loaded
  async verifyHomePageLoaded() {
    await expect(this.page).toHaveURL(/jupiter\.cloud\.planittesting\.com/);
    await expect(this.logo).toBeVisible();
    await expect(this.startShoppingButton).toBeVisible();
  }
}