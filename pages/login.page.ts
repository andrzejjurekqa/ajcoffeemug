import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker"

export class LoginSidebar {

    page: Page;
    accountButton: Locator;
    emailField: Locator;
    registerButton: Locator;
    username: Locator;
    password: Locator;
    loginButton: Locator;
    incorrectEmailError: Locator;
    existEmailError: Locator;
    incorrectCreds: Locator;


    constructor(page) {
        this.page = page;
        this.accountButton = page.getByRole('link', { name: 'inloggen' });
        this.emailField = page.locator('#dwfrm_preregister_username_default');
        this.registerButton = page.getByRole('button', { name: 'account aanmaken' });
        this.username = page.locator('#dwfrm_login_username_default');
        this.password = page.locator('#dwfrm_login_password_default');
        this.loginButton = page.getByRole('button', { name: 'inloggen' });
        this.incorrectEmailError = page.locator('#dwfrm_preregister_username_default-error')
        this.existEmailError = page.locator('.error-message-body').nth(1);
        this.incorrectCreds = page.locator('.js-login-error-message');
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async newEmail() {
        await this.emailField.fill(faker.internet.email());
        await this.registerButton.click();
    }
}