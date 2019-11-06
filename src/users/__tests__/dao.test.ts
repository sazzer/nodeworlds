import { DatabaseTestWrapper } from '../../database/testWrapper';
import { UserSeed } from '../userSeed';

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
        it('Finds a user that does exist', async () => {
            await container.seed(new UserSeed({
                email: 'testUser@example.com',
            }));
        });
        it('Doesn\'t find a user that doesn\'t exist', () => {
            // To come
        });
    });
});
