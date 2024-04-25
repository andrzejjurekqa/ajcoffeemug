import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page";
import { CookiesModal } from "../../pages/cookies.page";
let baseUrl = 'https://hema.nl';
import logData from '../../test-data/login.data.json';
const data = JSON.parse(JSON.stringify(logData));

let loginPage;
let cookiesModal;

test.describe('Login', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginSidebar(page);
        cookiesModal = new CookiesModal(page);
        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookieModal).not.toBeVisible();
        await loginPage.accountButton.click();
    })
    test('Login a user', async ({page}) => {
        await loginPage.username.fill(data.username);
        await loginPage.password.fill(data.password);
        await loginPage.loginButton.click();
        await expect(page.title()).toContain('Met liefde gemaakt')
    })
    test('Invalid login', async () => {
        await loginPage.username.fill('asdasdasd@das.com');
        await loginPage.password.fill(data.password);
        await loginPage.loginButton.click();
        await expect(loginPage.incorrectCreds).toContainText('De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend')
    })
    test('Invalid password', async () => {
        await loginPage.username.fill(data.username);
        await loginPage.password.fill('jordan12345@');
        await loginPage.loginButton.click();
        await expect(loginPage.incorrectCreds).toContainText('De combinatie van het e-mailadres en het wachtwoord is niet bij ons bekend')
    })
})