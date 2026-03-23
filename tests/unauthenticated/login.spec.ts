import { test, expect } from "../../fixtures/base.fixtures";
import { createUser } from "../../utils/account-generator";

test.describe("Login - Positive Flow", () => {
  test("Login with existing account", async ({
    basePage,
    loginPage,
    registerPage,
  }) => {
    const user = await createUser(registerPage);
    await basePage.logoutLink.click();
    await basePage.loginLink.click();
    await loginPage.login(user.email, user.password);
    await expect(basePage.logoutLink).toBeVisible();
  });
});

test.describe("Login - Negative Flow", () => {
  test("Login with inexisting account", async ({ loginPage, page }) => {
    await page.goto("/login");
    await loginPage.emailField.fill("test123456@tester123456.com");
    await loginPage.passwordField.fill("test123456@tester123456.com");
    await loginPage.loginBtn.click();
    await expect(loginPage.loginUnsuccessfulMsg).toBeVisible();
  });

  test("Login with empty form", async ({ loginPage, page }) => {
    await page.goto("/login");
    await loginPage.loginBtn.click();
    await expect(loginPage.enterEmailMsg).toBeVisible();
  });

  test("Login with incorrect password", async ({ loginPage, page }) => {
    await page.goto("/login");
    await loginPage.emailField.fill(`${process.env.TEST_USER_EMAIL}@test.com`);
    await loginPage.passwordField.fill(`${process.env.TEST_USER_PASSWORD}123`);
    await loginPage.loginBtn.click();
    await expect(loginPage.loginUnsuccessfulMsg).toBeVisible();
  });
});
