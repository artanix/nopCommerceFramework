import { test as base } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { LoginPage } from "../pages/login.page";
import { RegisterPage } from "../pages/register.page";

type MyFixtures = {
  basePage: BasePage;
  loginPage: LoginPage;
  registerPage: RegisterPage;
};

export const test = base.extend<MyFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await use(registerPage);
  },
});

export { expect } from "@playwright/test";
