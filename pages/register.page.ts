import { Page, Locator } from "@playwright/test";

export class RegisterPage {

    page: Page;
    passwordField: Locator;
    firstName: Locator;
    lastName: Locator;
    birthdate: Locator;
    postalCode: Locator;
    houseNumber: Locator;
    phone: Locator;
    cardBox: Locator;
    newsletterBox: Locator;
    signUp: Locator;
    incorrectEmailError: Locator;
    existEmailError: Locator;


    constructor(page) {
        this.page = page;
        this.passwordField = page.locator('#dwfrm_profile_login_password_NL');
        this.firstName = page.getByLabel('voornaam*');
        this.lastName = page.getByLabel('achternaam*');
        this.birthdate = page.getByLabel('geboortedatum*');
        this.postalCode = page.getByLabel('postcode*');
        this.houseNumber = page.getByLabel('huisnummer*');
        this.phone = page.getByLabel('telefoonnummer optioneel');
        this.cardBox = page.locator('label').filter({ hasText: 'ja, ik wil de HEMA klantenpas' });
        this.newsletterBox = page.locator('label').filter({ hasText: 'ja, ik wil de HEMA nieuwsbrief' });
        this.signUp = page.getByRole('button', { name: 'meld je aan' });
        this.incorrectEmailError = page.locator('#dwfrm_preregister_username_default-error')
        this.existEmailError = page.locator('.error-message-body').nth(1);
    }

    async register(): Promise<void> {
        await this.passwordField.fill('fakepass12345!');
        await this.firstName.fill('Fake');
        await this.lastName.fill('Name');
        await this.birthdate.fill('11-10-1990');
        await this.postalCode.fill('3781 DB');
        await this.houseNumber.fill('111');
        await this.phone.fill('0612345678');
    }

    async selectCard(checkbox: boolean) {
        if (checkbox = true) await this.newsletterBox.click()
    }
    async selectNewsletter(checkbox: boolean) {
        if (checkbox = true) await this.newsletterBox.click()
    }
}