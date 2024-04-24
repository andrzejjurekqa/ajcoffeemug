import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page"
import { RegisterPage } from "../../pages/register.page"
import { CookiesModal } from "../../pages/cookies.page"

let loginPage;
let registerPage;
let cookiesModal;

test.describe('E2E', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginSidebar(page);
        registerPage = new RegisterPage(page);
        cookiesModal = new CookiesModal(page);
        await page.goto('https://hema.nl');
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookieModal).not.toBeVisible()
        await loginPage.accountButton.click();
    })
    test('Register, Login, Select and Order', async ({ page }) => {
        await loginPage.newEmail()
        await registerPage.register()
        await registerPage.selectCard(true)
        await registerPage.selectNewsletter(false)
        await registerPage.signUp.click();
    })        
})