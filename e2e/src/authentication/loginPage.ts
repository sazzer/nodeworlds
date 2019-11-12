import { expect } from 'chai';
import { WebDriver } from 'selenium-webdriver';
import { Page } from '../selenium';

/**
 * Page Model for the page to log in as a known user
 *
 * @export
 * @class LoginPage
 * @extends {Page}
 */
export class LoginPage extends Page {
    /**
     * Construct the page model
     * @param {WebDriver} driver the web driver
     * @memberof LoginPage
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
        const form = await this.findElement('form[data-test="loginForm"]');
        const displayed = await form.isDisplayed();
        expect(displayed, 'Login Form Visibility').to.eq(true);
    }

    /**
     * Get the field with the given name
     *
     * @param {string} field The name of the field
     * @returns the value of the field
     * @memberof LoginPage
     */
    public async getField(field: string) {
        const input = await this.findElement(`form[data-test="loginForm"] input[name="${field}"]`);
        return await input.getAttribute('value');
    }

    /**
     * Set the value of the field with the given name
     *
     * @param {string} field The name of the field
     * @param {string} value The new value of the field
     * @memberof LoginPage
     */
    public async setField(field: string, value: string) {
        const input = await this.findElement(`form[data-test="loginForm"] input[name="${field}"]`);
        await input.clear();
        await input.sendKeys(value);
    }
}

export function loginPage(driver: WebDriver) {
    return new LoginPage(driver);
}
