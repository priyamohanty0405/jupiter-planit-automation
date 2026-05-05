import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object for Jupiter Shop page
 */
export class ShopPage {
  private readonly page: Page;

  /* Product locators present on shop page */
  private readonly stuffedFrog: Locator;
  private readonly fluffyBunny: Locator;
  private readonly valentineBear: Locator;
  /* Cart */
  private readonly cartTab: Locator;

  /* Navigate to shop page */
  async navigate() {
    await this.page.goto(`${process.env.BASE_URL}/#/shop`);
  }
  /*Page Objects for jupiter shop page*/
  constructor(page: Page) {
    this.page = page;

    // Product locators to find Buy button relative to product name
    this.stuffedFrog = page.locator("h4:has-text('Stuffed Frog')");
    this.fluffyBunny = page.locator("h4:has-text('Fluffy Bunny')");
    this.valentineBear = page.locator("h4:has-text('Valentine Bear')");
    this.cartTab = page.getByRole("link", { name: "Cart" });
  }

  /* Add product by clicking Buy button multiple times */
  private async buyProduct(productName: string, quantity: number) {
    const product = this.page.locator(`h4:has-text('${productName}')`);
    const buyButton = product.locator("xpath=..").getByText("Buy");

    for (let i = 0; i < quantity; i++) {
      await buyButton.click();
    }
  }

  /* Buy items as per the given test scenario */
  async purchaseItems() {
    await this.buyProduct("Stuffed Frog", 2);
    await this.buyProduct("Fluffy Bunny", 5);
    await this.buyProduct("Valentine Bear", 3);
  }

  /* Go to cart */
  async goToCart() {
    await this.cartTab.click();
  }

  /* Verify quantities in cart */
  async verifyCartQuantities() {
    const frogQty = this.page.locator("input[value='Stuffed Frog']").locator("xpath=../..").getByRole("spinbutton");
    const bunnyQty = this.page.locator("input[value='Fluffy Bunny']").locator("xpath=../..").getByRole("spinbutton");
    const bearQty = this.page.locator("input[value='Valentine Bear']").locator("xpath=../..").getByRole("spinbutton");

    await expect(frogQty).toHaveValue("2");
    await expect(bunnyQty).toHaveValue("5");
    await expect(bearQty).toHaveValue("3");
  }
}