import config from 'config';
import { Pool } from 'pg';
import pino from 'pino';

const logger = pino({ name: 'database' });

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

        this.pool = new Pool({
            connectionString,
        });

        this.pool.query('SELECT 1');
    }
}
