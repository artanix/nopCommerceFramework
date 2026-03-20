import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 2,
  reporter: [["html"], ["list"]],

  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "authenticated",
      testDir: "./tests/authenticated",
      dependencies: ["setup"],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./auth/storageState.json",
      },
    },
    {
      name: "unauthenticated",
      testDir: "./tests/unauthenticated",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
