import { RegisterPage } from "../pages/register.page";
import { faker } from "@faker-js/faker";

export async function createUser(registerPage: RegisterPage) {
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: `test_${Date.now()}@test.com`,
    password: "TestPass123!",
  };
  await registerPage.goto();
  await registerPage.register(
    user.firstName,
    user.lastName,
    user.email,
    user.password,
  );
  await registerPage.registrationContinueBtn.click();
  return user;
}
