import debug from 'debug';
import { Pool } from 'pg';
import { Model } from '../api';
import { UserService } from './api';
import { UserData, UserId } from './model';

/** The logger to use */
const logger = debug('nodeworlds:users:dao');

/**
 * DAO for accessing users
 */
export class UserDao implements UserService {
    /** The database connection */
    private readonly db: Pool;

    /**
     * Construct the DAO
     * @param {Pool} db the database connection
     * @memberof UserDao
     */
    public constructor(db: Pool) {
        this.db = db;
    }

    /**
     * Find the user with the provided username, if there is one
     *
     * @param {string} username the username to look for
     * @returns {Promise<Model<UserId, UserData>>} the user that matches
     * @memberof UserDao
     */
    public async findUserByUsername(username: string): Promise<Model<UserId, UserData> | undefined> {
        logger('Finding user with username: %s', username);

        const user = await this.db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 1) {
            const userRow = user.rows[0];
            const result = {
                identity: {
                    id: userRow.user_id,
                    version: userRow.version,
                    created: userRow.created,
                    updated: userRow.updated,
                },
                data: {
                    username: userRow.username,
                    email: userRow.email,
                    name: userRow.name,
                    password: userRow.password,
                },
            };
            logger('Found user: %o', result);
            return result;
        } else {
            logger('No user found for username %s', username);
            return undefined;
        }
    }
}
