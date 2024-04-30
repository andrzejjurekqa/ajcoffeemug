import { Page, Locator } from "@playwright/test";
import { Generics } from "./generic/generics";

export class MainPage extends Generics {

    page: Page;
    searchBar: Locator;
    searchResult: Locator;
    type: Locator;
    productName: Locator;
    seachInput: Locator;
    filters: Locator;
    enterdetails: Locator;
    availableDropdown: Locator;
    available: Locator;
    productPrice: Locator;
    orderButton: Locator;
    checkoutButton: Locator;
    totalPrice: Locator;
    greeting: Locator;
    profileName: Locator;

    constructor(page) {
        super();
        this.searchBar = page.locator('.js-search-fake');
        this.seachInput = page.locator('[id="q"]');
        this.searchResult = page.locator('.search-phrase');
        this.productName = page.locator('js-product-link');
        this.enterdetails = page.locator('.js-product-container');
        this.filters = page.locator('[data-refinement-id="producttype"]');
        this.availableDropdown = page.locator('.dropdown-item-accordion').filter({ hasText: 'online op voorraad' }).first();
        this.available = page.locator('[data-refinement-id="searchable"]');
        this.productPrice = page.locator('.js-price');
        this.orderButton = page.locator('.cart-icon');
        this.checkoutButton = page.locator('.checkout-btn');
        this.totalPrice = page.locator('.total-price > .price');
        this.greeting = page.locator('.acc-name-title');
        this.profileName = page.locator('.js-btn-login');
    }

    async searchCategory(category: string) {
        await this.searchBar.click();
        await this.seachInput.fill(category);
        await this.searchResult.filter({hasText: category }).first().click();
    }

    //hehe
    async filterProducts(filter: string) {
        await this.filters.filter({ hasText: filter }).first().click();
    }

    async selectAvailable() {
        await this.availableDropdown.click()
        await this.available.click();
    }

    //loop through product names and see if it matches the category
    async verifyProductType(text: string) {
        this.genericLoop(this.productName, text)
    }

    async enterProductDetails(product: string) {
        await this.enterdetails.filter({ hasText: product }).click();
    }
}