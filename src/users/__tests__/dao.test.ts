import { DatabaseTestWrapper } from '../../database/testWrapper';
import * as testSubject from '../dao';
import { UserSeed } from '../userSeed';

describe('Users DAO', () => {
    /** The database container */
    let container: DatabaseTestWrapper;

    /** The DAO to test */
    let dao: testSubject.UserDao;

    beforeEach(async () => {
        container = new DatabaseTestWrapper();
        await container.start();

        dao = new testSubject.UserDao(container.pool());
    }, 30000);

    afterEach(async () => {
        await container.stop();
    }, 30000);

    describe('findUserByEmail', () => {
        it('Finds a user that does exist', async () => {
            const user = await container.seed(new UserSeed({
                email: 'testUser@example.com',
            }));

            const foundUser = await dao.findUserByEmail(user.email);
            expect(foundUser).toEqual({
                identity: {
                    id: user.userId,
                    version: user.version,
                    created: user.created,
                    updated: user.updated,
                },
                data: {
                    email: user.email,
                    name: user.name,
                    password: expect.any(String),
                },
            });
        });
        it('Doesn\'t find a user that doesn\'t exist', async () => {
            const foundUser = await dao.findUserByEmail('unknown@example.com');
            expect(foundUser).toBeUndefined();
        });
    });
});