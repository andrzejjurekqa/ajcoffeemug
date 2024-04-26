import { test, expect } from "@playwright/test";
import { LoginSidebar } from "../../pages/login.page";
import { CookiesModal } from "../../pages/cookies.page";
import { MainPage } from "../../pages/main.page";
import { ProductPage } from "../../pages/product.page";
import { OrderPage } from "../../pages/orders.page";
import orderData from '../../test-data/socks.data.json';
const data = JSON.parse(JSON.stringify(orderData));

let loginSidebar;
let cookiesModal;
let mainPage;
let productPage;
let orderPage;
let baseUrl = 'https://hema.nl/';

test.describe('Cart', async () => {
    test.beforeEach(async ({ page }) => {
        loginSidebar = new LoginSidebar(page);
        cookiesModal = new CookiesModal(page);
        mainPage = new MainPage(page);
        productPage = new ProductPage(page);
        orderPage = new OrderPage(page);
        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookies).not.toBeVisible();
    })
    test('Add to cart', async () => {
        await mainPage.searchCategory(data.category);
        await mainPage.selectAvailable();
        await mainPage.filterProducts(data.type);
        await mainPage.enterProductDetails(data.product);
        await productPage.addToCart.click();
        await productPage.selectSize(data.productSize);
        await mainPage.checkoutButton.click();
        await expect(orderPage.verifyItemInOrder(data.product)).toBeTruthy();
    })
})