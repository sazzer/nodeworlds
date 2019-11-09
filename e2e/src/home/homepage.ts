import { WebDriver } from 'selenium-webdriver';
import { BasePage } from '../base';

/**
 * Page Model for the home page
 *
 * @export
 * @class HomePage
 * @extends {BasePage}
 */
export class HomePage extends BasePage {
    constructor(driver: WebDriver) {
        super(driver, '/');
    }
}

/**
 * Builder for the home page
 *
 * @export
 * @param {WebDriver} driver the web driver
 * @returns {HomePage} the home page
 */
export function homePage(driver: WebDriver): HomePage {
    return new HomePage(driver);
}
