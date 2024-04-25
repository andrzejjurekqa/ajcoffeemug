import { test, expect } from "@playwright/test";
import { LoginSidebar } from "../../pages/login.page";
import { CookiesModal } from "../../pages/cookies.page";
let baseUrl = 'https://hema.nl/';
import logData from '../../test-data/login.data.json';
const data = JSON.parse(JSON.stringify(logData));

let loginSidebar;
let cookiesModal;

test.describe('Login', async () => {
    test.beforeEach(async ({ page }) => {
        loginSidebar = new LoginSidebar(page);
        cookiesModal = new CookiesModal(page);
        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookies).not.toBeVisible();
        await loginSidebar.accountButton.click();
    })
    test('Login a user', async ({ page }) => {
        await loginSidebar.username.fill(data.username);
        await loginSidebar.password.fill(data.password);
        await loginSidebar.loginButton.click();
        await expect(page.title()).toContain('Met liefde gemaakt')
    })
    test('Invalid login', async () => {
        await loginSidebar.username.fill('asdasdasd@das.com');
        await loginSidebar.password.fill(data.password);
        await loginSidebar.loginButton.click();
        await expect(loginSidebar.incorrectCreds).toContainText('De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend')
    })
    test('Invalid password', async () => {
        await loginSidebar.username.fill(data.username);
        await loginSidebar.password.fill('jordan12345@');
        await loginSidebar.loginButton.click();
        await expect(loginSidebar.incorrectCreds).toContainText('De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend')
    })
})