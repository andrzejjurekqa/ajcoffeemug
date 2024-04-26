import { test, expect } from "@playwright/test"
import { LoginSidebar } from "../../pages/login.page"
import { RegisterPage } from "../../pages/register.page"
import { CookiesModal } from "../../pages/cookies.page"
let baseUrl = 'https://hema.nl';
import regData from '../../test-data/register.data.json';
const data = JSON.parse(JSON.stringify(regData));
import { faker } from "@faker-js/faker";
import { MainPage } from "../../pages/main.page";

let loginSidebar;
let registerPage;
let cookiesModal;
let mainPage;

test.describe('Registration', async () => {
    let username;

    test.beforeEach(async ({ page }) => {
        loginSidebar = new LoginSidebar(page);
        registerPage = new RegisterPage(page);
        cookiesModal = new CookiesModal(page);
        mainPage = new MainPage(page);

        await page.goto(baseUrl);
        await cookiesModal.acceptCookies.click();
        await expect(cookiesModal.cookies).not.toBeVisible();
        await loginSidebar.accountButton.click();
    })
    test('Register a new user', async () => {
        username = faker.internet.email();
        await loginSidebar.emailField.fill(username);
        await loginSidebar.registerButton.click();
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
        await expect(mainPage.greeting).toContainText('hoi ' + data.firstName);
    })

    test('Registration validations - email', async () => {
        await loginSidebar.emailField.fill('bordan');
        await loginSidebar.registerButton.click();
        await expect(loginSidebar.incorrectEmailError).toBeVisible();
        await loginSidebar.emailField.fill(username);
        await loginSidebar.registerButton.click();
        await expect(loginSidebar.existEmailError).toBeVisible();
        await expect(loginSidebar.existEmailError).toContainText('dit e-mailadres is niet geldig');

    })
    test('Registration validations - user data', async ({ page }) => {
        await loginSidebar.emailField.fill('totallynotfake' + Math.floor(Math.random() * 100000) + '@email.com');
        await loginSidebar.registerButton.click();
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