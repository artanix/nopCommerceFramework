import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class ProductListPage extends BasePage {
  // Navigation - Categories Sidebar
  readonly sidebarCategories: Locator;

  // Product List - Sort by + View
  readonly sortByDropdown: Locator;
  readonly displayPerPageDropdown: Locator;
  readonly gridViewBtn: Locator;
  readonly listViewBtn: Locator;

  //Product List - Cards
  readonly productCards: Locator;

  //Search + Advanced Search
  readonly searchKeywordInput: Locator;
  readonly searchAdvancedCheckbox: Locator;
  readonly searchCategoryList: Locator;
  readonly searchSubCategoriesCheckbox: Locator;
  readonly searchManufacturerList: Locator;
  readonly searchInDescriptionsCheckbox: Locator;
  readonly searchInTagsCheckbox: Locator;
  readonly searchPageBtn: Locator;
  readonly searchNoResultsMsg: Locator;
  readonly searchMinCharsMsg: Locator;

  //Pagination
  readonly pager: Locator;

  constructor(page: Page) {
    super(page);

    // Navigation - Categories Sidebar
    this.sidebarCategories = page.locator(".block-category-navigation");

    // Product List - Sort by + View
    this.sortByDropdown = page.getByLabel("Select product sort order");
    this.displayPerPageDropdown = page.getByLabel(
      "Select number of products per",
    );
    this.gridViewBtn = page.getByRole("button", { name: "Grid" });
    this.listViewBtn = page.getByRole("button", { name: "List", exact: true });

    // Product List - Cards
    this.productCards = page.locator(".product-item");

    //Search
    this.searchKeywordInput = page.getByLabel("Search keyword");
    this.searchAdvancedCheckbox = page.getByLabel("Advanced search");
    this.searchCategoryList = page.getByLabel("Category");
    this.searchSubCategoriesCheckbox = page.getByLabel(
      "Automatically search sub categories",
    );
    this.searchManufacturerList = page.getByLabel("Manufacturer");
    this.searchInDescriptionsCheckbox = page.getByLabel(
      "Search In product descriptions",
    );
    this.searchInTagsCheckbox = page.getByLabel("Search in product tags");
    this.searchPageBtn = page
      .locator("#main")
      .getByRole("button", { name: "Search" });

    this.searchNoResultsMsg = page.getByText("No products were found that");

    this.searchMinCharsMsg = page.getByText("Search term minimum length is");

    //Pager
    this.pager = page.locator(".pager");
  }

  // Search for Product
  async gotoSearch(keyword?: string) {
    await this.page.goto(`/search${keyword ? `?q=${keyword}` : ""}`);
  }

  // Get a specific category from the sidebar
  getSidebarCategoryLink(name: string) {
    return this.sidebarCategories.getByRole("link", { name });
  }

  // Get a specific product by name
  getProductByName(name: string) {
    return this.productCards.filter({ hasText: name });
  }

  // Get product price
  getProductPrice(name: string) {
    return this.getProductByName(name).locator(".actual-price");
  }

  // Add product to cart
  getProductAddToCartBtn(name: string) {
    return this.getProductByName(name).getByRole("button", {
      name: "Add to cart",
    });
  }

  // Add product to Compare function
  getProductCompareBtn(name: string) {
    return this.getProductByName(name).getByRole("button", {
      name: "Add to compare list",
    });
  }

  //Add product to Wishlist
  getProductWishlistBtn(name: string) {
    return this.getProductByName(name).getByRole("button", {
      name: "Add to wishlist",
    });
  }

  // Pagination - Get number of pages
  getPagerLink(page: number) {
    return this.pager.getByRole("link", { name: String(page) });
  }

  // Pagination - Next/Previous Pages
  get pagerNext() {
    return this.pager.locator(".next-page a");
  }
  get pagerCurrentPage() {
    return this.pager.locator(".current-page span");
  }
}
