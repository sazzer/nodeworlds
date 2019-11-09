import { Builder, ThenableWebDriver } from 'selenium-webdriver';

/** The actual web driver */
let driver: ThenableWebDriver | undefined;

/**
 * Create a new Web Driver to talk to our application
 *
 * @export
 */
export async function newDriver() {
    await quit();

    driver = new Builder()
        .forBrowser('chrome')
        .build();
}

/**
 * Take a screenshot of the current web page
 *
 * @export
 * @returns the screenshot, as a Base64 encoded PNG
 */
export async function takeScreenshot() {
    if (driver) {
        return await driver.takeScreenshot();
    }
}

/**
 * Shut down the web driver
 *
 * @export
 */
export async function quit() {
    if (driver) {
        await driver.quit();
    }
}
