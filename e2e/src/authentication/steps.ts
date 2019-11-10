import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
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

When('I register with details:', async (details: TableDefinition) => {
    const page = await createPage(registerPage);
    const fields = Object.entries(details.rowsHash());

    const fieldMapping: { [key: string]: string } = {
        'Name': 'name',
        'Password': 'password',
        'Repeat Password': 'password2',
    };

    for (const [field, value] of fields) {
        const fieldName = fieldMapping[field];
        await page.setField(fieldName, value);
    }

    await page.submit();
});

Then('I am registering a new user of {string}', async (email: string) => {
    const page = await createPage(registerPage);
    const emailValue = await page.getField('email');
    expect(emailValue).to.eq(email);
});

Then('registration fails with errors:', async (errors: TableDefinition) => {
    const expected = errors.raw().map(row => row[0]);

    const page = await createPage(registerPage);

    const errorMessages = await page.getErrors();
    expect(errorMessages).to.have.ordered.members(expected);
});
