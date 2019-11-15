import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { Page } from '../selenium';

/**
 * Page Model for the page to register a new user
 *
 * @export
 * @class RegisterPage
 * @extends {Page}
 */
export class RegisterPage extends Page {
    /**
     * Construct the page model
     * @param {WebDriver} driver the web driver
     * @memberof RegisterPage
     */
    constructor(driver: WebDriver) {
        super(driver, '/not-supported');
    }

    /**
     * Verify that we're actually on the correct page
     *
     * @memberof Page
     */
    public async verifyPage() {
        const form = await this.findElement('form[data-test="registerForm"]');
        const displayed = await form.isDisplayed();
        expect(displayed, 'Start Login Form Visibility').to.eq(true);
    }

    /**
     * Get the field with the given name
     *
     * @param {string} field The name of the field
     * @returns the value of the field
     * @memberof RegisterPage
     */
    public async getField(field: string) {
        const input = await this.findElement(`form[data-test="registerForm"] input[name="${field}"]`);
        return await input.getAttribute('value');
    }

    /**
     * Set the value of the field with the given name
     *
     * @param {string} field The name of the field
     * @param {string} value The new value of the field
     * @memberof RegisterPage
     */
    public async setField(field: string, value: string) {
        const input = await this.findElement(`form[data-test="registerForm"] input[name="${field}"]`);
        await input.clear();
        await input.sendKeys(value);
    }

    /**
     * Get the list of errors on the form
     *
     * @param {string} field The name of the field
     *
     * @returns The list of errors for this field
     * @memberof RegisterPage
     */
    public async getErrors(field: string) {
        const errorFields = await this.findElements(`form[data-test="registerForm"] div.form-group[data-test="${field}"] .invalid-feedback div`);

        const messages = errorFields.map(async error => await error.getText());
        return Promise.all(messages);
    }
    /**
     * Submit the form
     *
     * @memberof RegisterPage
     */
    public async submit() {
        const submitButton = await this.findElement('form[data-test="registerForm"] button[type="submit"]');
        await submitButton.click();
    }
}

export function registerPage(driver: WebDriver) {
    return new RegisterPage(driver);
}
