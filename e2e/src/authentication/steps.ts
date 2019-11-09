import { expect } from 'chai';
import { Then, When } from 'cucumber';
import { basePage } from '../base';
import { createPage } from '../selenium';
import { registerPage } from './registerPage';
import { startLoginPage } from './startLoginPage';

When('I start authentication as {string}', async (email: string) => {
    const basepage = await createPage(basePage);
    const header = await basepage.header;
    await header.login();

    const loginPage = await createPage(startLoginPage);
    await loginPage.setEmail(email);
    await loginPage.submit();
});

Then('I am registering a new user of {string}', async (email: string) => {
    const page = await createPage(registerPage);
    const emailValue = await page.getEmail();
    expect(emailValue).to.eq(email);
});
