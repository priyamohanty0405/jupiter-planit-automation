import { test as baseTest, BrowserContext, Page } from "@playwright/test";
import { HomePage } from "../page-objects/home/homePage.ts";
import { ShopPage } from "../page-objects/shop/shopPage.ts";
import { CartPage } from "../page-objects/cart/cartPage.ts";
import { contactPage } from "../page-objects/contacts/contactPage.ts";


export interface TestFixture {
  context: BrowserContext;
  newPage: Page;
  homePage: HomePage;
  shopPage: ShopPage;
  cartPage: CartPage;
  contactPage: contactPage;
}

/**
 * Central Playwright fixture with all page objects
 */
export const test = baseTest.extend<TestFixture>({

  // Browser context
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  // Page instance
  newPage: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // Home Page Objects
  homePage: async ({ newPage }, use) => {
    await use(new HomePage(newPage));
  },

  // Contact Page Objects
  contactPage: async ({ newPage }, use) => {
    await use(new contactPage(newPage));
  },

  // Shop Page Objects
  shopPage: async ({ newPage }, use) => {
    await use(new ShopPage(newPage));
  },

  // Cart Page Objects
  cartPage: async ({ newPage }, use) => {
    await use(new CartPage(newPage));
  },
});

export default test;