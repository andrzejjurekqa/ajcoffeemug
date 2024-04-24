import { Page, Locator } from "@playwright/test";

export class CookiesModal {

    page: Page;
    cookieModal: Locator;
    acceptCookies: Locator;

    constructor(page) {
        this.page = page;
        this.cookieModal = page.locator('.cookie-box');
        this.acceptCookies = page.getByRole('button', { name: 'accepteren' });
    }
}