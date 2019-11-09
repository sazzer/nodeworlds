
import normalizeUrl from 'normalize-url';
import { WebDriver } from 'selenium-webdriver';
import { PageObject } from './pageObject';

/**
 * Base class for page models
 *
 * @export
 * @class Page
 */
export abstract class Page extends PageObject {
    /** The URL to this page */
    private readonly url: string;

    /**
     * Construct the page
     * @param {WebDriver} driver The web driver
     * @memberof Page
     */
    constructor(driver: WebDriver, url: string) {
        super(driver);
        this.url = url;
    }

    /**
     * Visit the page
     *
     * @memberof Page
     */
    public async visit() {
        const urlBase = process.env.SELENIUM_BASE_URL;
        const fullUrl = normalizeUrl(urlBase + this.url);

        await (this.base as WebDriver).get(fullUrl);
    }

    /**
     * Verify that we're actually on the correct page
     *
     * @memberof Page
     */
    public async verifyPage() {
        // Nothing here
    }
}
