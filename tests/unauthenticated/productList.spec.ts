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
