import { test, expect } from "../../fixtures/base.fixtures";
import { faker } from "@faker-js/faker";
import { createUser } from "../../utils/account-generator";

let testUser: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

test.describe("Login - Positive Flow", () => {});
test.beforeAll(async () => {
  testUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test_${Date.now()}@test.com`,
    password: "TestPass123!",
  };
});

test("Login with existing account", async ({ loginPage, page }) => {});

test("Login with inexisting account", async ({ loginPage, page }) => {});

test("Login with asexisting account", async ({ loginPage, page }) => {});

test("Login with dwexisting account", async ({ loginPage, page }) => {});

test("Login with saexisting account", async ({ loginPage, page }) => {});
