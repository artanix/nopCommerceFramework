import { test as setup } from "../fixtures/base.fixtures";
import path from "path";

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const timestamp = Date.now();
const testUser = {
  firstName: `${process.env.TEST_USER_FIRST_NAME}${timestamp}`,
  lastName: `${process.env.TEST_USER_LAST_NAME}${timestamp}`,
  email: `${process.env.TEST_USER_EMAIL}${timestamp}@test.com`,
  password: process.env.TEST_USER_PASSWORD!,
};

setup("authenticate", async ({ page, registerPage }) => {
  await registerPage.goto();
  await registerPage.register(
    testUser.firstName,
    testUser.lastName,
    testUser.email,
    testUser.password,
  );
  await registerPage.registrationContinueBtn.click();
  await page.waitForURL("/");
  await page.context().storageState({ path: authFile });
});
