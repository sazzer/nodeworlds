import { By, WebElement } from 'selenium-webdriver';

/**
 * Page object representing the header bar
 *
 * @export
 * @class Header
 */
export class Header {
    /** The Web Element that is the base for this object */
    private readonly base: WebElement;

    /**
     * Construct the header
     * @param {WebElement} base The base element
     * @memberof Header
     */
    constructor(base: WebElement) {
        this.base = base;
    }

    /**
     * Start the login process
     *
     * @memberof Header
     */
    public async login() {
        const loginLink = await this.base.findElement(By.css('a.right.item'));
        await loginLink.click();
    }

}
