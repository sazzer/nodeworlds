import { v4 as uuid } from 'uuid';
import { SeedData } from '../database/seed';
import { hashPassword } from './password';

/**
 * Representation of a user to seed
 *
 * @export
 * @class UserSeed
 * @implements {SeedData}
 */
export class UserSeed implements SeedData {
    /** The User ID */
    public readonly userId: string;

    /** The version */
    public readonly version: string;

    /** The created date */
    public readonly created: Date;

    /** The updated date */
    public readonly updated: Date;

    /** The email address */
    public readonly email: string;

    /** The name */
    public readonly name: string;

    /** The password */
    public readonly password: string;

    /**
     * Construct the seed data
     * @param data The data to use
     * @memberof UserSeed
     */
    constructor(data: {
        userId?: string;
        version?: string;
        created?: Date;
        updated?: Date;
        email?: string;
        name?: string;
        password?: string;
    }) {
        this.userId = data.userId || uuid();
        this.version = data.version || uuid();
        this.created = data.created || new Date();
        this.updated = data.updated || new Date();
        this.email = data.email || `test-${uuid()}@example.com`;
        this.name = data.name || 'Test User';
        this.password = data.password || 'SuperSecretPassword';
    }

    /** The SQL to use to insert the record */
    public readonly sql: string = `INSERT INTO users(user_id, version, created, updated, email, name, password)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    /** The binds for the SQL */
    public async binds(): Promise<any[]> {
        return [
            this.userId,
            this.version,
            this.created,
            this.updated,
            this.email,
            this.name,
            await hashPassword(this.password),
        ];
    }

}
