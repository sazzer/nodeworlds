import config from 'config';
import { Pool } from 'pg';
import pino from 'pino';
import { migrate } from 'postgres-migrations';

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
        logger.info('Collecting to database: %s', connectionString);

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
        await migrate({
            database: 'nodeworlds',
            user: 'nodeworlds',
            password: 'nodeworlds',
            host: 'localhost',
            port: 45432,
        },
            'migrations',
            {
                logger: msg => logger.info(msg),
            });

    }
}
