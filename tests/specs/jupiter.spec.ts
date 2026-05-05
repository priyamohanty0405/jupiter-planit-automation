import test  from "../fixtures/jupiterFixture.ts";
import { expect } from "@playwright/test";

test.describe("Jupiter Planit – End to End Flow", () => {

  test("@jupiterPlanit  Home >> Contact >> shop >> cart end to end flow", async ({
    homePage,
    shopPage,
    cartPage,
    contactPage,
  }) => {

    /* HOME PAGE */
    await homePage.navigateToHomePage();
    await homePage.verifyHomePageLoaded();

    /* CONTACT PAGE */
    await contactPage.navigate();
    await contactPage.submitEmpty();
    await contactPage.verifyErrorMessages();
    await contactPage.fillMandatoryFields(
      "Priyanka Mohanty",
      "priyanka@test.com",
      "Hello, good morning! This is a playwright test message."
    );
     await contactPage.verifyErrorsGone();
    await contactPage.submitValidForm();

    /*SHOP PAGE*/
    await shopPage.navigate();
   // buys Stuffed Frog, Fluffy Bunny, Valentine Bear
    await shopPage.purchaseItems(); 
    

    /*CART PAGE */
    await cartPage.navigate();
    const products = [
      "Stuffed Frog",
      "Fluffy Bunny",
      "Valentine Bear"
    ];

    // Verify price exists (basic validation)
    for (const product of products) {
      const price = await cartPage.getPrice(product);
      expect(price).toBeGreaterThan(0);
    }

    // Verify subtotal for each product
    for (const product of products) {
      await cartPage.verifySubtotal(product);
    }

    // Verify total = sum(subtotals)
    await cartPage.verifyTotal(products);
  });
});