import { WebDriver } from 'selenium-webdriver';
import { Page } from '../selenium';
import { Header } from './header';

/**
 * Base class for all page models
 *
 * @export
 * @abstract
 * @class BasePage
 * @extends {Page}
 */
export class BasePage extends Page {
  /**
   * Construct the page
   * @param {WebDriver} driver The web driver
   * @memberof Page
   */
  constructor(driver: WebDriver, url: string) {
    super(driver, url);
  }

  /**
   * Get the page header
   *
   * @readonly
   * @memberof BasePage
   */
  public get header() {
    return this.findElement('[data-test="header"]')
      .then(element => new Header(element));
  }
}

/**
 * Constructor for the base page, for cases that are not page specific
 *
 * @export
 * @param {WebDriver} driver the web driver
 * @returns the page model
 */
export function basePage(driver: WebDriver) {
  return new BasePage(driver, '');
}
