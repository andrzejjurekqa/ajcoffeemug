import { Page } from "@playwright/test"
import { LoginSidebar } from "../pages/login.page"
import { RegisterPage } from "../pages/register.page"
import { CookiesModal } from "../pages/cookies.page"
import { MainPage } from "../pages/main.page";
import { OrderPage } from "../pages/orders.page";
import { ProductPage } from "../pages/product.page";


export class PageManager {
    page: Page;
    cookiesModal;
    loginSidebar;
    registerPage;
    mainPage;
    orderPage;
    productPage;

    constructor(page: Page) {
        this.page = page;
        this.loginSidebar = new LoginSidebar(this.page);
        this.cookiesModal = new CookiesModal(this.page);
        this.registerPage = new RegisterPage(this.page);
        this.mainPage = new MainPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.productPage = new ProductPage(this.page);
    }
}