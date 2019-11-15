import { expect } from 'chai';
import { TableDefinition, Then, When } from 'cucumber';
import { basePage } from '../base';
import { createPage } from '../selenium';
import { loginPage } from './loginPage';
import { registerPage } from './registerPage';
import { startLoginPage } from './startLoginPage';

When('I start authentication as {string}', async (username: string) => {
    const basepage = await createPage(basePage);
    const header = await basepage.header;
    await header.login();

    const loginpage = await createPage(startLoginPage);
    await loginpage.setField('username', username);
    await loginpage.submit();
});

When('I register with details:', async (details: TableDefinition) => {
    const page = await createPage(registerPage);
    const fields = Object.entries(details.rowsHash());

    const fieldMapping: { [key: string]: string } = {
        'Name': 'name',
        'Email Address': 'email',
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
    const value = await page.getField('username');
    expect(value).to.eq(email);
});

Then('I am logging in as {string}', async (email: string) => {
    const page = await createPage(loginPage);
    const value = await page.getField('username');
    expect(value).to.eq(email);
});

Then('registration fails with errors:', async (errors: TableDefinition) => {
    const page = await createPage(registerPage);

    const fieldMapping: { [key: string]: string } = {
        'Name': 'nameField',
        'Email Address': 'emailField',
        'Password': 'passwordField',
        'Repeat Password': 'password2Field',
    };

    const expectedErrors = errors.hashes();

    for (const fieldError of expectedErrors) {
      const field = fieldError.Field;
      const error = fieldError.Error;

      const fieldErrors = await page.getErrors(fieldMapping[field]);
      expect(fieldErrors).to.contain(error);
    }
});
