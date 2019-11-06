import debug from 'debug';
import { Model } from '../api';
import { UserService } from './api';
import { UserData, UserId } from './model';

/** The logger to use */
const logger = debug('nodeworlds:users:dao');

/**
 * DAO for accessing users
 */
export class UserDao implements UserService {
    /**
     * Find the user with the provided Email Address, if there is one
     *
     * @param {string} email the email address to look for
     * @returns {Promise<Model<UserId, UserData>>} the user that matches
     * @memberof UserDao
     */
    public async findUserByEmail(email: string): Promise<Model<UserId, UserData> | undefined> {
        logger('Finding user with email address: %s', email);

        return Promise.resolve({
            identity: {
                id: '',
                version: '',
                created: new Date(),
                updated: new Date(),
            },
            data: {
                email,
                name: 'Graham',
                password: 'null',
            },
        });
    }
}
