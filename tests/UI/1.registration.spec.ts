import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page"
import { RegisterPage } from "../../pages/register.page"
import { CookiesModal } from "../../pages/cookies.page"
let baseUrl = 'https://hema.nl';
import regData from '../../test-data/register.data.json';
const data = JSON.parse(JSON.stringify(regData));
import { faker } from "@faker-js/faker";

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
        await expect(cookiesModal.cookieModal).not.toBeVisible();
        await loginPage.accountButton.click();
    })
    test.only('Register a new user', async ({ page }) => {
        await loginPage.emailField.fill(faker.internet.email());
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
        await expect(page.locator('.acc-name-title')).toContainText('hoi ' + data.firstName);
    })

    test('Registration validations - email', async () => {
        await loginPage.emailField.fill('bordan');
        await loginPage.registerButton.click();
        await expect(loginPage.incorrectEmailError).toBeVisible();
        await loginPage.emailField.fill('totallynotfake@email.com');
        await loginPage.registerButton.click();
        await expect(loginPage.existEmailError).toBeVisible();
        await expect(loginPage.existEmailError).toContainText('dit e-mailadres is niet geldig');

    })
    test.only('Registration validations - user data', async ({ page }) => {
        await loginPage.emailField.fill('totallynotfake' + Math.floor(Math.random() * 100000) + '@email.com');
        await loginPage.registerButton.click();
        await registerPage.passwordField.fill('a');
        await page.locator('.content-wrap').click();
        await expect(registerPage.passValidation).toContainText('wachtwoord is te kort, voer een wachtwoord in van minimaal 8 karakters')
        await registerPage.passwordField.fill('asdfghjk');
        await registerPage.signUp.click();
        await expect(registerPage.passWarning).toContainText('zwak wachtwoord, we adviseren je om een sterker wachtwoord te kiezen')
        await registerPage.passwordField.fill('asdfghjkas');
        await registerPage.signUp.click();
        await expect(registerPage.passWarning).toContainText('matig wachtwoord, dat kan beter')
        await registerPage.passwordField.fill('');
        await registerPage.signUp.click();
        await expect(registerPage.passValidation).toContainText('vul een geldige waarde in')
        await expect(registerPage.nameValidation).toContainText('vul een geldige waarde in')
        await expect(registerPage.lastNameValidation).toContainText('vul een geldige waarde in')
        await expect(registerPage.birthValidation).toContainText('vul een geldige waarde in')
        await expect(registerPage.postValidation).toContainText('vul een geldige waarde in')
        await expect(registerPage.houseValidation).toContainText('vul een geldige waarde in')
    })
})