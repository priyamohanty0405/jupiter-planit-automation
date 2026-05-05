import type { Page, Locator } from "@playwright/test";
import { expect } from "@playwright/test";

/* Page Object for the contact page. */
export class contactPage {
  private readonly page: Page;

  /* Locators */
  private readonly forename: Locator;
  private readonly surname: Locator;
  private readonly emailInput: Locator;
  private readonly telephone: Locator;
  private readonly messageTextArea: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;

  private readonly forenameError: Locator;
  private readonly emailError: Locator;
  private readonly messageError: Locator;

  //page constructor to initialize locators
  constructor(page: Page) {
    this.page = page;
    this.forename = page.locator('#forename');
    this.surname = page.locator('#surname');
    this.emailInput = page.locator('#email');
    this.telephone = page.locator('#telephone');
    this.messageTextArea = page.locator('#message');
    this.submitButton = page.getByText('Submit', { exact: true });
    this.successMessage = page.getByText("Thanks for contacting us");

    // validation messages
    this.forenameError = page.getByText("Forename is required");
    this.emailError = page.getByText("Email is required");
    this.messageError = page.getByText("Message is required");
  }

   /* Navigate to contact page */
 async navigate() {
    await this.page.goto(`${process.env.BASE_URL}/#/contact`);
  }

  // Click submit button without filling form
  async submitEmpty() {
    await this.submitButton.click();
  }

  // Verify error validation messages
  async verifyErrorMessages() {
    await expect(this.forenameError).toBeVisible();
    await expect(this.emailError).toBeVisible();
    await expect(this.messageError).toBeVisible();
  }

   // Populate mandatory fields
  async fillMandatoryFields(name: string, email: string, message: string) {
    await this.forename.fill(name);
    await this.emailInput.fill(email);
    await this.messageTextArea.fill(message);
  }

   //Validate errors are gone
  async verifyErrorsGone() {
    await expect(this.forenameError).toHaveCount(0);
    await expect(this.emailError).toHaveCount(0);
    await expect(this.messageError).toHaveCount(0);
  }
  //submit the form with valid data
  async submitValidForm() {
    await this.submitButton.click();
  }
}


  
