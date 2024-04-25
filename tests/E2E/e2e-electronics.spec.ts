import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page"
import { RegisterPage } from "../../pages/register.page"
import { CookiesModal } from "../../pages/cookies.page"
import { MainPage } from "../../pages/main.page";

let loginPage;
let registerPage;
let cookiesModal;
let mainPage;

test.describe('E2E', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginSidebar(page);
        registerPage = new RegisterPage(page);
        cookiesModal = new CookiesModal(page);
        mainPage = new MainPage(page);
        await page.goto('https://hema.nl');
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookieModal).not.toBeVisible()
        await loginPage.accountButton.click();
    })
    test('Register, Login, Select and Order', async () => {
        await loginPage.newEmail();
        await registerPage.register();
        //here login in new page
        await mainPage.searchCategory('electronisch');
        await mainPage.filterProducts('deken');
        await mainPage.filterProducts('gum');
        await mainPage.verifyProductType('deken');
        await mainPage.verifyProductType('gum');
        await mainPage.selectProduct('elektrisch onderdeken')
        await mainPage.selectProduct('navullingen voor elektrisch gum')


    })        
})