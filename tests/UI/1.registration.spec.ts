import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page"
import { RegisterPage } from "../../pages/register.page"
import { CookiesModal } from "../../pages/cookies.page"
let baseUrl = 'https://hema.nl';
import regData from '../../test-data/register.data.json';
const data = JSON.parse(JSON.stringify(regData));

let loginPage;
let registerPage;
let cookiesModal;

test.describe('Registration', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginSidebar(page);
        registerPage = new RegisterPage(page);
        cookiesModal = new CookiesModal(page);
        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookieModal).not.toBeVisible()
        await loginPage.accountButton.click();
    })
    test('Register a new user', async ({ page }) => {
        await loginPage.emailField.fill('totally' + Math.floor(Math.random() * 100000) + '@fake.com');
        await loginPage.registerButton.click();
        await registerPage.passwordField.fill(data.passwordField);
        await registerPage.firstName.fill(data.firstName);
        await registerPage.lastName.fill(data.lastName);
        await registerPage.birthdate.fill(data.birthdate);
        await registerPage.postalCode.fill(data.postalCode);
        await registerPage.houseNumber.fill(data.houseNumber);
        await registerPage.phone.fill(data.phone);
        await registerPage.selectCard(data.cardBox);
        await registerPage.selectNewsletter(data.newsletterBox);
        await registerPage.signUp.click();
        await expect(page.locator('.acc-name-title')).toContainText('hoi ' + data.firstName)
    })

    test('Registration validations - email', async () => {
        await loginPage.emailField.fill('bordan');
        await loginPage.registerButton.click();
        await expect(registerPage.incorrectEmailError).toBeVisible()
        await registerPage.emailField.fill('totallynotfake@email.com');
        await registerPage.registerButton.click();
        await expect(registerPage.existEmailError).toBeVisible()
        await expect(registerPage.existEmailError).toContainText('dit e-mailadres is niet geldig')

    })
    test('Registration validations - user data', async () => {
        await loginPage.emailField.fill('totallynotfake' + Math.floor(Math.random() * 100000) + '@email.com')
        await loginPage.registerButton.click();
        await registerPage.passwordField.fill('fakepass12345!');
        await registerPage.firstName.fill('Fake');
        await registerPage.lastName.fill('Name');
        await registerPage.birthdate.fill('11-10-1990');
        await registerPage.postalCode.fill('3781 DB');
        await registerPage.houseNumber.fill('111');
        await registerPage.phone.fill('0612345678');
    })
})