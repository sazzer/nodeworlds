import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { Page } from '../selenium';

/**
 * Page Model for the page to start authentication
 *
 * @export
 * @class StartLoginPage
 * @extends {Page}
 */
export class StartLoginPage extends Page {
    /**
     * Construct the page model
     * @param {WebDriver} driver the web driver
     * @memberof StartLoginPage
     */
    constructor(driver: WebDriver) {
        super(driver, '/login');
    }

    /**
     * Verify that we're actually on the correct page
     *
     * @memberof Page
     */
    public async verifyPage() {
        const form = await this.findElement('form[data-test="startLoginForm"]');
        const displayed = await form.isDisplayed();
        expect(displayed, 'Start Login Form Visibility').to.eq(true);
    }

    /**
     * Set the email address to log in as
     *
     * @param {string} email the email address
     * @memberof StartLoginPage
     */
    public async setEmail(email: string) {
        const emailInput = await this.findElement('form[data-test="startLoginForm"] input[name="email"]');
        await emailInput.clear();
        await emailInput.sendKeys(email);
    }

    /**
     * Submit the form
     *
     * @memberof StartLoginPage
     */
    public async submit() {
        const submitButton = await this.findElement('form[data-test="startLoginForm"] button[type="submit"]');
        await submitButton.click();
    }
}

export function startLoginPage(driver: WebDriver) {
    return new StartLoginPage(driver);
}
