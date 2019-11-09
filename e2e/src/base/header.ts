import { By, WebElement } from 'selenium-webdriver';
import { PageObject } from '../selenium';

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
        const loginLink = await this.findElement(By.css('a.right.item'));
        await loginLink.click();
    }

}
