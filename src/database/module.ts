/* istanbul ignore file */
import config from 'config';
import debug from 'debug';
import { Pool } from 'pg';
import { migrateDb } from './migrate';

/** The logger to use */
const logger = debug('nodeworlds:database');

/**
 * Module representing the database connection
 */
export class DatabaseModule {
    /** The database connection pool */
    public readonly pool: Pool;

    /**
     * Construct the module
     * @memberof DatabaseModule
     */
    constructor() {
        const connectionString: string = config.get('database.url');
        logger('Collecting to database: %s', connectionString);

        this.pool = new Pool({
            connectionString,
        });

        this.pool.query('SELECT 1');
    }

    /**
     * Migrate the database to the latest version of the schema
     *
     * @memberof DatabaseModule
     */
    public async migrate() {
        const connectionString: string = config.get('database.url');
        await migrateDb(connectionString);
    }
}
