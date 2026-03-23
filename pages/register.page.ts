import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  // Personal Details
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;

  // Company Details
  readonly companyDetailsSubheader: Locator;
  readonly companyNameField: Locator;
  readonly vatNumberField: Locator;
  readonly vatNumberNote: Locator;

  // Newsletter
  readonly subscribeToNewsletterSubheader: Locator;
  readonly isActiveCheckbox: Locator;

  // Password
  readonly yourPasswordSubheader: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;

  // Actions
  readonly registerBtn: Locator;

  // Validation messages
  readonly firstNameRequiredMsg: Locator;
  readonly lastNameRequiredMsg: Locator;
  readonly emailRequiredMsg: Locator;
  readonly passwordRequiredMsg: Locator;
  readonly registrationCompleteMsg: Locator;
  readonly registrationContinueBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // Personal Details
    this.firstNameField = page.getByRole("textbox", { name: "First name:" });
    this.lastNameField = page.getByRole("textbox", { name: "Last name:" });
    this.emailField = page.getByRole("textbox", { name: "Email:" });

    // Company Details
    this.companyDetailsSubheader = page.getByRole("heading", {
      name: "Company Details",
    });
    this.companyNameField = page.getByRole("textbox", {
      name: "Company name:",
    });
    this.vatNumberField = page.getByRole("textbox", { name: "VAT number:" });
    this.vatNumberNote = page.getByText("NOTE: Enter VAT number with");

    // Newsletter
    this.subscribeToNewsletterSubheader = page.getByRole("heading", {
      name: "Subscribe to newsletter",
    });
    this.isActiveCheckbox = page.getByRole("checkbox", { name: "IsActive" });

    // Password
    this.yourPasswordSubheader = page.getByRole("heading", {
      name: "Your Password",
    });
    this.passwordField = page.getByRole("textbox", {
      name: "Password:",
      exact: true,
    });
    this.confirmPasswordField = page.getByRole("textbox", {
      name: "Confirm password:",
    });

    // Actions
    this.registerBtn = page.getByRole("button", { name: "Register" });

    // Validation messages
    this.firstNameRequiredMsg = page.getByText("First name is required.");
    this.lastNameRequiredMsg = page.getByText("Last name is required.");
    this.emailRequiredMsg = page.getByText("Email is required.");
    this.passwordRequiredMsg = page.getByText("Password is required.");

    // Post register page http://localhost:8085/registerresult/1?returnUrl=/
    this.registrationCompleteMsg = page.getByText(
      "Your registration completed",
    );
    this.registrationContinueBtn = page.getByRole("link", { name: "Continue" });
  }

  // goto URL function
  async goto() {
    await this.page.goto("/register");
  }

  // register with Mandatory Fields
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.confirmPasswordField.fill(password);
    await this.registerBtn.click();
  }
}
