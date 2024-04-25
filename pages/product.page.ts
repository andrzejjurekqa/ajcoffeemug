import { Page, Locator } from "@playwright/test";

export class ProductPage {

    page: Page;
    addToCart: Locator;

    constructor(page) {
        this.addToCart = page.getByRole('button', { name: ' in winkelmandje' })
    }
}
