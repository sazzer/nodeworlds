import { Model } from '../api';
import { UserData, UserId } from './model';

/**
 * Interface describing how to retrieve user records
 *
 * @export
 * @interface UserRetriever
 */
export interface UserRetriever {
    /**
     * Find the user with the provided Email Address, if there is one
     *
     * @param {string} email the email address to look for
     * @returns {Promise<Model<UserId, UserData>>} the user that matches
     * @memberof UserRetriever
     */
    findUserByEmail(email: string): Promise<Model<UserId, UserData> | undefined>;
}

export type UserService = UserRetriever;
