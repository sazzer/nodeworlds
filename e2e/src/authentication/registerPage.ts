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
     * Get the email address to register as
     *
     * @memberof RegisterPage
     */
    public async getEmail() {
        const emailInput = await this.findElement('form[data-test="registerForm"] input[name="email"]');
        return await emailInput.getAttribute('value');
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
