import { Then, When } from 'cucumber';
import { basePage } from '../base';
import { createPage } from '../selenium';
import { startLoginPage } from './startLoginPage';

When('I start authentication as {string}', async (email: string) => {
    const basepage = createPage(basePage);
    const header = await basepage.header;
    await header.login();

    const loginPage = createPage(startLoginPage);
    await loginPage.setEmail(email);
    await loginPage.submit();
});

Then('I am registering a new user of {string}', async (email: string) => {

});
