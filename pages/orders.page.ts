import { Page, Locator } from "@playwright/test";
import { Generics } from "./generic/generics"

export class OrderPage extends Generics {

    page: Page;
    itemInfo: Locator;
    totalAmount: Locator;

    constructor(page: Page) {
        super();
        this.page = page;
        this.itemInfo = page.locator('.item-info');
        this.totalAmount = page.locator('.total-amount');
    }

    //loop through products and return true if found 
    async verifyItemInOrder(productName) {
        this.genericLoop(this.itemInfo, productName)
    }
}
