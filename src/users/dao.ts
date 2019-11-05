import { Model } from '../api';
import { UserService } from './api';
import { UserData, UserId } from './model';

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
