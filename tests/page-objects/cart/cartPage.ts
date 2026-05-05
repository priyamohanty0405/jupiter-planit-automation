import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/**
 * Page Object for Jupiter Cart page
 */
export class CartPage {
  private readonly page: Page;

  private readonly cartRows: Locator;
  private readonly totalPrice: Locator;

  //page constructor to initialize locators
  constructor(page: Page) {
    this.page = page;

    // Each product row in cart
    this.cartRows = page.locator("table tbody tr");

    // Total price at bottom of cart
    this.totalPrice = page.locator(".total.ng-binding");
  }

  //navigate to cart page
  async navigate() {
    await this.page.goto(`${process.env.BASE_URL}/#/cart`);
  }

  //get row by product name
private getRow(productName: string): Locator {
  return this.page.locator('tr.cart-item').filter({
    has: this.page.locator('td:first-child', {
      hasText: new RegExp(productName)
    })
  });
}

  //Get unit price of product
  async getPrice(productName: string): Promise<number> {
  const row = this.getRow(productName);
  const priceText = await row.locator('td').nth(1).textContent();
  console.log("RAW PRICE TEXT:", priceText);
  return this.parsePrice(priceText ?? "");
}

  //Get quantity of product
  async getQuantity(productName: string): Promise<number> {
    const row = this.getRow(productName);
    await expect(row.locator("input[name='quantity']")).toBeVisible();
    const qty = await row.locator("input[name='quantity']").inputValue();
    return Number(qty);
  }

  //Get subtotal of product
  async getSubtotal(productName: string): Promise<number> {
  const row = this.getRow(productName);
  const subtotalText = await row.locator(".ng-binding").last().textContent();
  return this.parsePrice(subtotalText ?? "0");
}

  // Validate subtotal for all the products in cart
  async verifySubtotal(productName: string) {
  const price = await this.getPrice(productName);
  console.log("price:", price);
  const qty = await this.getQuantity(productName);
  console.log("qty:", qty);
  const subtotal = await this.getSubtotal(productName);
  console.log("subtotal:", subtotal);
  const expected = price * qty;
  expect(subtotal).toBeCloseTo(expected, 2);
  
}

  // Validate total price
  async verifyTotal(products: string[]) {
    let calculatedTotal = 0;

    for (const product of products) {
      const subtotal = await this.getSubtotal(product);
      calculatedTotal += subtotal;
    }
  // Get displayed total from page and compare with calculated total
    const displayedTotalText = await this.totalPrice.textContent();
    const displayedTotal = this.parsePrice(displayedTotalText ?? "0");

    expect(displayedTotal).toBe(calculatedTotal);
  }

  // Utility: convert price text like "$20.00" to number 20.00
  private parsePrice(text: string): number {
  return parseFloat(text.replace(/[^0-9.]/g, ""));
}
}