import debug from 'debug';
import normalizeUrl from 'normalize-url';
import { WebDriver } from 'selenium-webdriver';
import { getDriver } from './driver';
import { PageObject } from './pageObject';

/** The logger to use */
const logger = debug('nodeworlds:e2e:selenium:page');

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

/**
 * Create a page model for the current browser state
 *
 * @export
 * @template T the type of page model to create
 * @param {(driver: WebDriver) => T} constructor the constructor function to use
 * @returns {T} the page model
 */
export async function createPage<T extends Page>(constructor: (driver: WebDriver) => T): Promise<T> {
    const driver = getDriver();

    logger('Creating page model: %o', constructor);
    const page = constructor(driver);
    await page.verifyPage();

    return page;
}
