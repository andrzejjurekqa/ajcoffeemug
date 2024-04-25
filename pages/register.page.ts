import { Page, Locator } from "@playwright/test";
import { faker } from "@faker-js/faker"

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
    passValidation: Locator;
    passWarning: Locator;
    nameValidation: Locator;
    lastNameValidation: Locator;
    birthValidation: Locator;
    houseValidation: Locator;
    postValidation: Locator;

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
        this.passValidation = page.locator('#dwfrm_profile_login_password_NL-error');
        this.passWarning = page.locator('.password-strength-msg');
        this.nameValidation = page.locator('#dwfrm_profile_customer_name_firstname_NL-error');
        this.lastNameValidation = page.locator('#dwfrm_profile_customer_name_lastname_NL-error');
        this.birthValidation = page.locator('#dwfrm_profile_customer_birthday_NL-error');
        this.postValidation = page.locator('#dwfrm_profile_address_postal_NL-error');
        this.houseValidation = page.locator('#dwfrm_profile_address_houseNumber_NL-error');
    }

    generateBirthday() {
        let day = faker.number.int({ min: 1, max: 28 });
        let month = faker.number.int({ min: 1, max: 12 });
        const year = faker.number.int({ min: 1912, max: 2006 });
        return day.toString().padStart(2, "0") + '-' + month.toString().padStart(2, "0") + '-' + year.toString();
    }

    async register() {
        let password = faker.internet.password();
        let name = faker.person.firstName()
        await this.passwordField.fill(password);
        await this.firstName.fill(name);
        await this.lastName.fill(faker.person.lastName());
        await this.birthdate.fill(this.generateBirthday());
        await this.postalCode.fill('3781 DB');
        await this.houseNumber.fill('111');
        await this.phone.fill(faker.string.numeric({ length: 10 }));
        await this.selectCard(true);
        await this.selectNewsletter(false);
        await this.signUp.click();
        return [password, name];
    }

    async selectCard(checkbox: boolean) {
        if (checkbox === true) {
            await this.cardBox.click();
        }
    }
    async selectNewsletter(checkbox: boolean) {
        if (checkbox === true) {
            await this.newsletterBox.click();
        }
    }
}