import { WebElementCondition } from 'selenium-webdriver';
import { getDriver } from './driver';

/**
 * Wait for the provided condition to pass
 * @param  condition The condition to wait for
 * @param  timeout   The timeout to wait
 * @param  message   The message if we fail
 */
export async function wait(condition: WebElementCondition, timeout?: number, message?: string) {
  const driver = getDriver();
  await driver.wait(condition, timeout, message);
}
