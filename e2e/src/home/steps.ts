import { Given } from 'cucumber';
import { createPage } from '../selenium';
import { homePage } from './homepage';

Given('I open the home page', async () => {
    const page = createPage(homePage);
    await page.visit();
});
