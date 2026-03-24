import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
  // Headings
  readonly welcomeHeader: Locator;
  readonly newCustomerSubheader: Locator;
  readonly returningCustomerSubheader: Locator;

  // Info text
  readonly createAccountNote: Locator;

  // Fields
  readonly emailField: Locator;
  readonly passwordField: Locator;

  // Interactions
  readonly rememberMeCheckbox: Locator;
  readonly forgotPasswordLink: Locator;

  // Actions
  readonly loginBtn: Locator;

  // Validation messages
  readonly enterEmailMsg: Locator;
  readonly invalidEmailMsg: Locator;
  readonly loginUnsuccessfulMsg: Locator;

  constructor(page: Page) {
    super(page);

    // Headings
    this.welcomeHeader = page.getByRole("heading", {
      name: "Welcome, Please Sign In!",
    });
    this.newCustomerSubheader = page.getByRole("heading", {
      name: "New Customer",
    });
    this.returningCustomerSubheader = page.getByRole("heading", {
      name: "Returning Customer",
    });

    // Info text
    this.createAccountNote = page.getByText("By creating an account on our");

    // Fields
    this.emailField = page.getByRole("textbox", { name: "Email:" });
    this.passwordField = page.getByRole("textbox", { name: "Password:" });

    // Interactions
    this.rememberMeCheckbox = page.getByRole("checkbox", {
      name: "Remember me?",
    });
    this.forgotPasswordLink = page.getByRole("link", {
      name: "Forgot password?",
    });

    // Actions
    this.loginBtn = page.getByRole("button", { name: "Log in" });

    // Validation messages
    this.enterEmailMsg = page.getByText("Please enter your email");
    this.invalidEmailMsg = page.getByText("Please enter a valid email");
    this.loginUnsuccessfulMsg = page.getByText("Login was unsuccessful.");
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginBtn.click();
  }
}
