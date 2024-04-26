import { Page, Locator } from "@playwright/test";

export class OrderPage {

    page: Page;
    itemInfo: Locator;
    totalAmount: Locator;

    constructor(page) {
        this.itemInfo = page.locator('.item-info');
        this.totalAmount = page.locator('.total-amount')
    }

    async verifyItemInOrder(productName) {
        const items = this.itemInfo;
        for (let i = 0; i < await items.count(); i++) {
            const itemList = await items.nth(i).textContent();
            if (itemList!.includes(productName!)) {
                return true
            } else {
                throw new Error('Item not found');
            }
        }
    }
}
