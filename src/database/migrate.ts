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

    const migrateConfig = {
        user: parsed.username,
        password: parsed.password,
        host: parsed.hostname || '',
        port: parseInt(parsed.port, 10),
        database: parsed.pathname.substr(1),
    };
    logger('Migrating database: %o', migrateConfig);

    await migrate(migrateConfig, 'migrations', { logger: msg => logger(msg) });
}
