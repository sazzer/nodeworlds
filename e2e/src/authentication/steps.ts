import { When } from 'cucumber';
import { basePage } from '../base';
import { createPage } from '../selenium';

When('I start authentication as {string}', async (email: string) => {
    const page = createPage(basePage);
    const header = await page.header;
    await header.login();
});
