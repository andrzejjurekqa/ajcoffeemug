import { Page, Locator } from "@playwright/test";

export class MainPage {

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
        this.searchBar = page.locator('.js-search-fake');
        this.seachInput = page.locator('[id="q"]');
        this.searchResult = page.getByRole('link');
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
        this.profileName = page.locator('.profile-name');
    }

    async searchCategory(category: string) {
        await this.searchBar.click();
        await this.seachInput.fill(category);
        await this.searchResult.filter({ hasText: category }).first().click();
    }

    //hehe
    async filterProducts(filter: string) {
        await this.filters.filter({ hasText: filter }).first().click();
    }

    async selectAvailable() {
        await this.availableDropdown.click()
        await this.available.click();
    }

    async verifyProductType(text: string) {
        const names = this.productName;
        for (let i = 0; i < await names.count(); i++) {
            const productNames = await names.nth(i).textContent();
            if (productNames!.includes(text!)) {
                return true;
            } else {
                throw new Error('Product not found');
            }
        }
    }

    async enterProductDetails(product: string) {
        let price;
        const products = this.enterdetails;
        for (let i = 0; i < await products.count(); i++) {
            const productList = await products.nth(i).textContent();
            if (productList!.includes(product!)) {
                await products.nth(i).click();
                price = this.productPrice.nth(i).textContent();
                return price.toString().slice(1, 3);
            }
        }
    }
}