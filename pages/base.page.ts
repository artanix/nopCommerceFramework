import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;

  // Header - Common
  readonly cartLink: Locator;
  readonly wishlistLink: Locator;
  readonly searchField: Locator;
  readonly searchBtn: Locator;

  // Header - Logged In
  readonly myAccountLink: Locator;
  readonly logoutLink: Locator;

  // Header - Logged Out
  readonly registerLink: Locator;
  readonly loginLink: Locator;

  // Navigation - Categories Breadcrumbs
  readonly breadcrumb: Locator;

  // Footer
  readonly footerLinks: Locator;

  constructor(page: Page) {
    this.page = page;

    //Header - Common
    this.cartLink = page.getByRole("link", { name: "Shopping cart" });
    this.wishlistLink = page.getByRole("link", { name: "Wishlist" });
    this.searchField = page.getByRole("textbox", { name: "Search store" });
    this.searchBtn = page.getByRole("button", { name: "Search" });

    // Header - Logged In
    this.myAccountLink = page
      .getByRole("banner")
      .getByRole("link", { name: "My account" });
    this.logoutLink = page.getByRole("link", { name: "Log out" });

    // Header - Logged out
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.loginLink = page.getByRole("link", { name: "Log in" });

    // Navigation - Categories Breadcrumbs
    this.breadcrumb = page.locator(".breadcrumb");

    // Footer
    this.footerLinks = page
      .getByRole("navigation")
      .filter({ hasText: "Information Sitemap Shipping" });
  }

  getBreadcrumbLink(name: string) {
    return this.breadcrumb.getByRole("link", { name });
  }

  getCategoryLink(name: string) {
    return this.page.getByRole("link", { name, exact: true });
  }
}
