import { Page, Locator } from "@playwright/test";

export class ProductPage {

    page: Page;
    addToCart: Locator;
    selectOption: Locator;

    constructor(page) {
        this.addToCart = page.getByRole('button', { name: ' in winkelmandje' });
        this.selectOption = page.locator('.js-variation-swatchanchor');
    }

    async selectSize(productSize: string) {
        await this.selectOption.filter({ hasText: productSize }).click();
    }
}
