import { test, expect } from "@playwright/test";
import { LoginSidebar } from "../../pages/login.page";
import { CookiesModal } from "../../pages/cookies.page";
import { MainPage } from "../../pages/main.page";
import orderData from '../../test-data/socks.data.json';
const data = JSON.parse(JSON.stringify(orderData));

let loginSidebar;
let cookiesModal;
let mainPage;
let baseUrl = 'https://hema.nl/';

test.describe('Search', async () => {
    let price;
    test.beforeEach(async ({ page }) => {
        loginSidebar = new LoginSidebar(page);
        cookiesModal = new CookiesModal(page);
        mainPage = new MainPage(page);
        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookies).not.toBeVisible();
    })
    test('Search for product', async ()=> {
        await mainPage.searchCategory(data.category);
        await mainPage.selectAvailable();
        await mainPage.filterProducts(data.type);
        await mainPage.verifyProductType(data.type);
        price = await mainPage.enterProductDetails(data.product);
    })
})