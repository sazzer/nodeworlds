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
     * Set the value of the field with the given name
     *
     * @param {string} field The name of the field
     * @param {string} value The new value of the field
     * @memberof LoginPage
     */
    public async setField(field: string, value: string) {
        const input = await this.findElement(`form[data-test="startLoginForm"] input[name="${field}"]`);
        await input.clear();
        await input.sendKeys(value);
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
