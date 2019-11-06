import config from 'config';
import debug from 'debug';
import { Pool } from 'pg';
import { migrate } from 'postgres-migrations';

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
        await migrate({
            database: 'nodeworlds',
            user: 'nodeworlds',
            password: 'nodeworlds',
            host: 'localhost',
            port: 45432,
        },
            'migrations',
            {
                logger: msg => logger(msg),
            });

    }
}
