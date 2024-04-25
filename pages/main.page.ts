import { Page, Locator, expect } from "@playwright/test";

export class MainPage {

    page: Page;
    searchBar: Locator;
    searchResult: Locator;
    type: Locator;
    productResult: Locator;
    productName: Locator;
    seachInput: Locator;
    filters: Locator;
    addToCart: Locator;

    constructor(page) {
        this.searchBar = page.locator('.js-search-fake');
        this.seachInput = page.locator('#q')
        this.searchResult = page.locator('.js-phrase-suggestion-link').first();
        this.productResult = page.locator('.js-product-container');
        this.productName = page.locator('js-product-link')
        this.filters = page.locator('data-refinement-id="producttype"')
        this.addToCart = page.locator('#add-to-cart')
    }

    async searchCategory(category: string) {
        await this.searchBar.click()
        await this.seachInput.fill(category)
        const rows = this.searchResult;

        for (let i = 0; i < await rows.count(); i++) {
            const rowResult = await rows.nth(i).textContent();
            if (rowResult!.includes(category!)) {
                await rows.nth(i).click();
            }
        }
    }

    async filterProducts(filter: string) {
        await this.type.filter({ hasText: filter }).click();
    }

    async verifyProductType(productType: string) {
        await expect(this.productName).toContainText(productType);
    }

    async selectProduct(product: string) {
        const products = this.productResult;
        for (let i = 0; i < await products.count(); i++) {
            const rowResult = await products.nth(i).textContent();
            if (rowResult!.includes(product!)) {
                await this.addToCart.nth(i).click();
            }
        }
    }
}