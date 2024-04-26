import { test, expect } from "@playwright/test"
import { PageManager } from "../../pages/page.manager"
import orderData from '../../test-data/electronics.data.json';
const data = JSON.parse(JSON.stringify(orderData));
const baseUrl = 'https://www.hema.nl/';

let pageManager;

test.describe('Register, Login, Select and Order', async () => {
    let username;
    let creds;
    let password;
    let name;

    test.beforeEach(async ({ page }) => {
        pageManager = new PageManager(page);
        //open the page and accept the cookies
        await page.goto(baseUrl);
        await pageManager.cookiesModal.acceptCookies.click();
        await expect(pageManager.cookiesModal.cookies).not.toBeVisible();
    })
    test('Register and Login', async ({ browser }) => {
        await pageManager.loginSidebar.accountButton.click();
        username = await pageManager.loginSidebar.newEmail();
        creds = await pageManager.registerPage.register();
        password = creds[0];
        name = creds[1];
        await expect(pageManager.mainPage.greeting).toContainText('hoi ' + name);
        //login in new page
        const context = await browser.newContext();
        const page2 = await context.newPage();
        pageManager = new PageManager(page2);
        await page2.goto(baseUrl);
        await pageManager.cookiesModal.acceptCookies.click();
        await expect(pageManager.cookiesModal.cookies).not.toBeVisible();
        await pageManager.loginSidebar.accountButton.click();
        await pageManager.loginSidebar.login(username, password);
        await expect(page2.url()).toEqual(baseUrl)
        await expect(pageManager.mainPage.profileName).toContainText(name)
    })
    test('Select and Verify', async () => {
        //Search for electronics
        await pageManager.mainPage.searchCategory(data.category);
        await pageManager.mainPage.selectAvailable();
        await pageManager.mainPage.filterProducts(data.type);
        await expect(pageManager.mainPage.verifyProductType(data.type)).toBeTruthy();
    })
    test('Add to cart and Verify', async () => {
        //Add to Cart & go to Checkout
        await pageManager.mainPage.searchCategory(data.category);
        await pageManager.mainPage.selectAvailable();
        await pageManager.mainPage.filterProducts(data.type);
        await pageManager.mainPage.enterProductDetails(data.product);
        await pageManager.productPage.addToCart.click();
        await pageManager.mainPage.checkoutButton.click();
        await expect(pageManager.orderPage.verifyItemInOrder(data.product)).toBeTruthy();
    })
})