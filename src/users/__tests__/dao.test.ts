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
    }, 120000);

    afterEach(async () => {
        await container.stop();
    }, 150000);

    describe('findUserByUsername', () => {
        it('Finds a user that does exist', async () => {
            const user = await container.seed(new UserSeed({
                username: 'testUser',
            }));

            const foundUser = await dao.findUserByUsername(user.username);
            expect(foundUser).toEqual({
                identity: {
                    id: user.userId,
                    version: user.version,
                    created: user.created,
                    updated: user.updated,
                },
                data: {
                    username: user.username,
                    email: user.email,
                    name: user.name,
                    password: expect.any(String),
                },
            });
        });
        it('Doesn\'t find a user that doesn\'t exist', async () => {
            const foundUser = await dao.findUserByUsername('unknown');
            expect(foundUser).toBeUndefined();
        });
    });
});
