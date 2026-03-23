import { test, expect } from "../../fixtures/base.fixtures";
import { faker } from "@faker-js/faker";

let testUser: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

test.describe("Registration - Positive Flow", () => {
  test.beforeEach(async () => {
    testUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `test_${Date.now()}@test.com`,
      password: "TestPass123!",
    };
  });

  test("Register only with Mandatory Fields", async ({
    registerPage,
    page,
  }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password,
    );
    await expect(registerPage.registrationCompleteMsg).toBeVisible();
    await registerPage.registrationContinueBtn.click();
    await page.waitForURL("/");
  });

  test("Register with every Existing Field", async ({ registerPage, page }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password,
      {
        vatNumber: faker.finance.pin(),
        companyName: faker.company.name(),
        gender: Math.random() > 0.5 ? "Male" : "Female",
        newsletter: Math.random() > 0.5,
        confirmPassword: testUser.password,
      },
    );
    await expect(registerPage.registrationCompleteMsg).toBeVisible();
    await registerPage.registrationContinueBtn.click();
    await page.waitForURL("/");
  });
});

test.describe("Registration - Negative Flow", () => {
  test.beforeEach(async () => {
    testUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `test_${Date.now()}@test.com`,
      password: "TestPass123!",
    };
  });
  test("Attempt registration without completing mandatory fields.", async ({
    registerPage,
    page,
  }) => {
    await registerPage.goto();
    await registerPage.registerBtn.click();
    await expect(registerPage.firstNameRequiredMsg).toBeVisible();
    await expect(registerPage.lastNameRequiredMsg).toBeVisible();
    await expect(registerPage.emailRequiredMsg).toBeVisible();
    await expect(registerPage.passwordRequiredMsg).toBeVisible();
  });

  test("Attempt registration with wrong e-mail format.", async ({
    registerPage,
  }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      "test",
      testUser.password,
    );
    await expect(registerPage.invalidEmailMsg).toBeVisible();
  });

  test("Attempt registration with an already registered mail", async ({
    registerPage,
    basePage,
  }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password,
    );
    await basePage.logoutLink.click();
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password,
    );
    await expect(registerPage.duplicateEmailMsg).toBeVisible();
  });

  test("Attempt registration with a short password", async ({
    registerPage,
    page,
  }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      "123",
    );
    await expect(registerPage.invalidPasswordMsg).toBeVisible();
  });

  test("Attempt registration with a password mismatch", async ({
    registerPage,
    page,
  }) => {
    await registerPage.goto();
    await registerPage.register(
      testUser.firstName,
      testUser.lastName,
      testUser.email,
      testUser.password,
      { confirmPassword: "WrongPassword123!" },
    );
    await expect(registerPage.passwordMismatchMsg).toBeVisible();
  });
});
