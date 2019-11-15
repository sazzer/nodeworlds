import { until, WebElement } from 'selenium-webdriver';
import { PageObject, wait } from '../selenium';

/**
 * Page object representing the header bar
 *
 * @export
 * @class Header
 */
export class Header extends PageObject {
    /**
     * Construct the header
     * @param {WebElement} base The base element
     * @memberof Header
     */
    constructor(base: WebElement) {
        super(base);
    }

    /**
     * Start the login process
     *
     * @memberof Header
     */
    public async login() {
        const loginLink = await this.findElement('[data-test="login"]');

        if (await loginLink.isDisplayed() === false) {
            const toggleHeader = await this.findElement('[data-toggle="collapse"]');
            await toggleHeader.click();
            await wait(until.elementIsVisible(loginLink));
        }

        await loginLink.click();
    }

}
