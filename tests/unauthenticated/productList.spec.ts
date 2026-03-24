import { ProductListPage } from "@pages/productList.page";
import { test, expect } from "../../fixtures/base.fixtures";

test.describe("Product - Search", () => {
  test("Search for existing product", async ({ productListPage }) => {
    await productListPage.gotoSearch("iphone 16");
    await expect(productListPage.productCards).not.toHaveCount(0);
  });

  test("Search for nonexistent product", async ({ productListPage }) => {
    await productListPage.gotoSearch("asdfghjk");
    await expect(productListPage.searchNoResultsMsg).toBeVisible();
  });

  test("Search with minimum characters", async ({ productListPage }) => {
    await productListPage.gotoSearch("as");
    await expect(productListPage.searchMinCharsMsg).toBeVisible();
  });

  test("Advanced Search with Category Filter", async ({ productListPage }) => {
    await productListPage.gotoSearch("apple");
    await productListPage.searchAdvancedCheckbox.check();
    await productListPage.searchCategoryList.selectOption(
      "Electronics >> Cell phones",
    );
    await productListPage.searchPageBtn.click();
    await expect(productListPage.productCards).not.toHaveCount(0);
    await expect(productListPage.getProductByName("iphone")).toBeVisible();
  });

  test("Advanced Search with Manufacturer Filter", async ({
    productListPage,
  }) => {
    await productListPage.gotoSearch("phone");
    await productListPage.searchAdvancedCheckbox.check();
    await productListPage.searchManufacturerList.selectOption("HTC");
    await productListPage.searchPageBtn.click();
    // Verify results were filtered down
    await expect(productListPage.productCards).not.toHaveCount(0);
    // Verify no non-HTC products appear
    await expect(productListPage.getProductByName("Apple")).not.toBeVisible();
  });
});

test.describe("Product - Category Navigation", () => {
  test("Check topbar categories", async ({ basePage, page }) => {
    await page.goto("/");
    const topCategoryLink = basePage.getCategoryLink("Electronics");
    const href = await topCategoryLink.getAttribute("href");
    await topCategoryLink.click();
    await expect(page).toHaveURL(href!);
  });

  test("Check leftside categories", async ({ page, productListPage }) => {
    await page.goto("/search");
    const leftCategoryLink =
      productListPage.getSidebarCategoryLink("Electronics");
    const href = await leftCategoryLink.getAttribute("href");
    await leftCategoryLink.click();
    await expect(page).toHaveURL(href!);
  });

  test("Check breadcrumb navigation", async ({ page, productListPage }) => {
    await page.goto("/search");
    await page.getByRole("button", { name: "Electronics" }).hover();
    await page.getByRole("button", { name: "Camera & photo" }).click();
    const parentLink = productListPage.getBreadcrumbLink("Electronics");
    const href = await parentLink.getAttribute("href");
    await parentLink.click();
    await expect(page).toHaveURL(href!);
  });
});

test.describe("Product - Sort & Display", () => {
  test("Sort by price low to high and check order", async ({
    productListPage,
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Computers" }).hover();
    await page.getByRole("button", { name: "Notebooks" }).click();

    await productListPage.sortByDropdown.selectOption({
      label: "Price: Low to High",
    });

    await page.waitForLoadState("networkidle");

    // Grab all existing prices
    const prices = await productListPage.productCards
      .locator(".actual-price")
      .allTextContents();

    // Convert "$1,200.00" strings to numbers
    const numericPrices = prices.map((p) =>
      parseFloat(p.replace(/[^0-9.]/g, "")),
    );

    // Check each price is <= the next one
    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeLessThanOrEqual(numericPrices[i + 1]);
    }
  });

  test("Sort by price high to low and check order", async ({
    productListPage,
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Computers" }).hover();
    await page.getByRole("button", { name: "Notebooks" }).click();

    await productListPage.sortByDropdown.selectOption({
      label: "Price: High to Low",
    });

    await page.waitForLoadState("networkidle");

    // Grab all existing prices
    const prices = await productListPage.productCards
      .locator(".actual-price")
      .allTextContents();

    // Convert "$1,200.00" strings to numbers
    const numericPrices = prices.map((p) =>
      parseFloat(p.replace(/[^0-9.]/g, "")),
    );

    // Check each price is <= the next one
    for (let i = 0; i < numericPrices.length - 1; i++) {
      expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i + 1]);
    }
  });

  test("Sort by name Z to A and check order", async ({
    productListPage,
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Computers" }).hover();
    await page.getByRole("button", { name: "Notebooks" }).click();
    await productListPage.sortByDropdown.selectOption({
      label: "Name: Z to A",
    });

    await page.waitForLoadState("networkidle");

    // Grab all existing names
    const names = await productListPage.productCards
      .locator(".product-title a")
      .allTextContents();

    // Check each name is >= the next one (reverse alphabetical Z to A)
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
    }
  });

  test("Change number of items displayed and check number of products shown", async ({
    productListPage,
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Computers" }).hover();
    await page.getByRole("button", { name: "Notebooks" }).click();
    await productListPage.displayPerPageDropdown.selectOption({
      label: "3",
    });
    await expect(productListPage.productCards).toHaveCount(3);
  });

  test("Toggle between List View and Grid View", async ({
    productListPage,
    page,
  }) => {
    await page.goto("/notebooks");
    await productListPage.listViewBtn.click();
    await expect(productListPage.listViewBtn).toHaveClass(/selected/);
    await expect(page).toHaveURL(/viewmode=list/);
    await productListPage.gridViewBtn.click();
    await expect(productListPage.gridViewBtn).toHaveClass(/selected/);
    await expect(page).toHaveURL(/viewmode=grid/);
  });

  test("asd", async ({ productListPage, page }) => {});

  test("2asd", async ({ productListPage, page }) => {});

  test("3asd", async ({ productListPage, page }) => {});
});
