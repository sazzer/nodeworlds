import debug from 'debug';
import { By, WebDriver, WebElement } from 'selenium-webdriver';

/** The logger to use */
const logger = debug('nodeworlds:e2e:selenium:pageObject');

/** The base type that this revolves around */
type BaseElement = WebDriver | WebElement;

/**
 * Base class for all page objects
 *
 * @export
 * @class PageObject
 */
export class PageObject {
  /** The base web element */
  protected readonly base: BaseElement;

  /**
   * Construct the page object
   * @param {BaseElement} base the base web element
   * @memberof PageObject
   */
  constructor(base: BaseElement) {
    this.base = base;
  }

  /**
   * Find the element with the given locator
   *
   * @protected
   * @param {Locator} locator the locator
   * @returns the web element
   * @memberof PageObject
   */
  protected findElement(locator: string) {
    logger('Finding first element with locator: %s', locator);
    return this.base.findElement(By.css(locator));
  }

  /**
   * Find the elements with the given locator
   *
   * @protected
   * @param {Locator} locator the locator
   * @returns the web elements
   * @memberof PageObject
   */
  protected findElements(locator: string) {
    logger('Finding all elements with locator: %s', locator);
    return this.base.findElements(By.css(locator));
  }
}
