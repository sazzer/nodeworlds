import { WebDriver } from 'selenium-webdriver';
import { Page } from '../selenium';

/**
 * Page Model for the home page
 *
 * @export
 * @class HomePage
 * @extends {Page}
 */
export class HomePage extends Page {
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
