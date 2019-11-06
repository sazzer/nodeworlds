import debug from 'debug';
import { migrate } from 'postgres-migrations';
import { URL } from 'url';

/** The logger to use */
const logger = debug('nodeworlds:database:migrate');

/**
 * Migrate the database to the latest schema
 *
 * @export
 * @param {string} connectionString The database URL to use
 */
export async function migrateDb(connectionString: string) {
    const parsed = new URL(connectionString);

    await migrate({
        user: parsed.username,
        password: parsed.password,
        host: parsed.hash || '',
        port: parseInt(parsed.port, 10),
        database: parsed.pathname.substr(1),
    },
        'migrations',
        {
            logger: msg => logger(msg),
        });

}
