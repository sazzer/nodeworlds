import { Given, TableDefinition } from 'cucumber';
import { UserSeed } from '../../../src/users/userSeed';
import { seed } from '../database';

/**
 * The mappings between the Cucumber table fields and the seed data keys
 */
const mappedFields: { [field: string]: any } = {
    'User ID': 'userId',
    'Version': 'version',
    'Created': 'created',
    'Updated': 'updated',
    'Email Address': 'email',
    'Name': 'name',
    'Password': 'password',
};

Given('a user exists with details:', async (user: TableDefinition) => {
    const userData = user.rowsHash();

    const userSeedData: { [field: string]: any } = {};
    Object.entries(userData).forEach(([field, value]) => {
        const mappedField = mappedFields[field];
        if (mappedField) {
            userSeedData[mappedField] = value;
        }
    });

    seed(new UserSeed(userSeedData));
});
