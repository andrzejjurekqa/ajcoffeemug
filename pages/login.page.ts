import { Page, Locator } from "@playwright/test";

export class LoginSidebar {

    page: Page;
    accountButton: Locator;
    emailField: Locator;
    registerButton: Locator;
    username: Locator;
    password: Locator;
    loginButton: Locator;


    constructor(page) {
        this.page = page;
        this.accountButton = page.getByRole('link', { name: 'inloggen' });
        this.emailField = page.locator('#dwfrm_preregister_username_default');
        this.registerButton = page.getByRole('button', { name: 'account aanmaken' });
        this.username = page.locator('#dwfrm_login_username_default');
        this.password = page.locator('#dwfrm_login_password_default');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async newEmail(email: string) {
        await this.emailField.fill('totally' + Math.floor(Math.random() * 100000) + '@fake.com');
        await this.registerButton.click();
    }
}