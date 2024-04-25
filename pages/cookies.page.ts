import { Page, Locator } from "@playwright/test";

export class CookiesModal {

    page: Page;
    cookies: Locator;
    acceptCookies: Locator;

    constructor(page) {
        this.page = page;
        this.cookies = page.locator('.cookie-box');
        this.acceptCookies = page.getByRole('button', { name: 'accepteren' });
    }
}