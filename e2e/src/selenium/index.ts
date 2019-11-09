import { After, Before } from 'cucumber';
import { Builder, ThenableWebDriver } from 'selenium-webdriver';

/** The actual web driver */
let driver: ThenableWebDriver;

Before(async () => {
    driver = new Builder()
        .forBrowser('chrome')
        .build();

    const baseUrl = process.env.SELENIUM_BASE_URL || '';

    await driver.get(baseUrl);
});

After(async function() {
    const screenshot = await driver.takeScreenshot();
    this.attach(screenshot, 'image/png');

    await driver.quit();
});
