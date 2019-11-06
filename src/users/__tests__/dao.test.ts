import { DatabaseTestWrapper } from '../../database/testWrapper';

describe('Users DAO', () => {
    let container: DatabaseTestWrapper;

    beforeEach(async () => {
        container = new DatabaseTestWrapper();
        await container.start();
    }, 30000);

    afterEach(async () => {
        await container.stop();
    }, 30000);

    describe('findUserByEmail', () => {
        it('Finds a user that does exist', () => {

        });
        it('Doesn\'t find a user that doesn\'t exist', () => {

        });
    });
});
