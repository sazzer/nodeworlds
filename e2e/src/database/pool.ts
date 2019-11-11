import debug from 'debug';
import { Pool } from 'pg';

/** The logger to use */
const logger = debug('nodeworlds:e2e:database:pool');

/** The connection pool */
let pgPool: Pool | undefined;

/**
 * Create the database connection pool
 *
 * @export
 */
export function createPool() {
    const url = process.env.POSTGRES_URL;
    logger('Connecting to database: %s', url);

    pgPool = new Pool({
        connectionString: url,
    });
}

/**
 * Close the database pool
 *
 * @export
 */
export function closePool() {
    logger('Closing database connection');
    pgPool = undefined;
}
