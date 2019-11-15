import debug from 'debug';
import { Builder, ThenableWebDriver, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

/** The logger to use */
const logger = debug('nodeworlds:e2e:selenium:driver');

/** The actual web driver */
let driver: ThenableWebDriver | undefined;

/**
 * Create a new Web Driver to talk to our application
 *
 * @export
 */
export async function newDriver() {
    await quit();

    logger('Starting new WebDriver');

    const chromeOptions = new ChromeOptions();

    if (process.env.SELENIUM_CHROME_MOBILE) {
      chromeOptions.setMobileEmulation({
        deviceName: process.env.SELENIUM_CHROME_MOBILE,
      });
    }

    driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
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
        logger('Taking screenshot');
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
        logger('Closing webdriver');
        await driver.quit();
        driver = undefined;
    }
    logger('Closed webdriver');
}

/**
 * Get the actual web Driver
 * @return The web driver
 */
export function getDriver(): WebDriver {
  if (driver === undefined) {
      throw new Error('No WebDriver available');
  }
  return driver;
}
