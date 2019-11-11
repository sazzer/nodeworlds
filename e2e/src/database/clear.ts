import debug from 'debug';
import { pool } from './pool';

/** The logger to use */
const logger = debug('nodeworlds:e2e:databsae:clear');

/**
 * Clear the database of all content
 *
 * @export
 */
export async function clearDatabase() {
    const pgPool = pool();

    const tables = await pgPool.query('SELECT table_name FROM information_schema.tables WHERE table_schema=$1',
        ['public']);

    const tableNames = tables.rows
        .map(row => row.table_name)
        .filter(tableName => tableName !== 'migrations');

    logger('List of all tables: %o', tableNames);

    const sql = 'TRUNCATE ' + tableNames.join(',');
    await pgPool.query(sql);
}
