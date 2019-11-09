
import normalizeUrl from 'normalize-url';
import { WebDriver } from 'selenium-webdriver';

/**
 * Base class for page models
 *
 * @export
 * @class Page
 */
export abstract class Page {
    /** The WebDriver */
    private readonly driver: WebDriver;

    /** The URL to this page */
    private readonly url: string;

    /**
     * Construct the page
     * @param {WebDriver} driver The web driver
     * @memberof Page
     */
    constructor(driver: WebDriver, url: string) {
        this.driver = driver;
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

        await this.driver.get(fullUrl);
    }
}
