import debug from 'debug';
import { Pool } from 'pg';
import { GenericContainer, StartedTestContainer, Wait } from 'testcontainers';
import { migrateDb } from './migrate';

/** The logger to use */
const logger = debug('nodeworlds:database:testWrapper');

/**
 * Interface representing some seed data to add to the database
 *
 * @export
 * @interface SeedData
 */
export interface SeedData {
    /** The SQL to use for inserting the data */
    readonly sql: string;

    /** The binds for the SQL */
    binds(): Promise<any[]>;
}

/**
 * Wrapper around a Postgres Database for use in tests
 *
 * @export
 * @class DatabaseTestWrapper
 */
export class DatabaseTestWrapper {
    /** The actual container */
    private container: StartedTestContainer | undefined;

    /** The connecton URL to use */
    public url: string = '';

    /** The database pool */
    private pgPool: Pool | undefined;
    /**
     * Start the container
     *
     * @memberof DatabaseTestWrapper
     */
    public async start() {
        logger('Starting database');
        const container = new GenericContainer('postgres', '11.5-alpine')
            .withExposedPorts(5432)
            .withWaitStrategy(Wait.forLogMessage('listening on IPv4 address "0.0.0.0", port 5432'))
            .withEnv('POSTGRES_DB', 'nodeworlds-test')
            .withEnv('POSTGRES_USER', 'nodeworlds-test')
            .withEnv('POSTGRES_PASSWORD', 'nodeworlds-test');

        this.container = await container.start();

        await new Promise(resolve => setTimeout(resolve, 200));

        const databaseHost = process.env.TEST_DOCKER_HOST || this.container.getContainerIpAddress();
        this.url = `postgresql://nodeworlds-test:nodeworlds-test@${databaseHost}:${this.container.getMappedPort(5432)}/nodeworlds-test`;
        logger('Started database: %s', this.url);

        this.pgPool = new Pool({
            connectionString: this.url,
        });

        await migrateDb(this.url);
        logger('Started database');
    }

    /**
     * Stop the container
     *
     * @memberof DatabaseTestWrapper
     */
    public async stop() {
        if (this.container !== undefined) {
            logger('Stopping database');
            await this.container.stop();
        }
    }

    /**
     * Get a database connection
     *
     * @returns {Pool} the connection
     * @memberof DatabaseTestWrapper
     */
    public pool(): Pool {
        if (this.pgPool === undefined) {
            throw new Error('No connection available');
        }
        return this.pgPool;
    }
    /**
     * Seed some data into the database
     *
     * @template T The type of the data to seed
     * @param {T} data the data to seed
     * @returns {Promise<T>} the data that was seeded
     * @memberof DatabaseTestWrapper
     */
    public async seed<T extends SeedData>(data: T): Promise<T> {
        const binds = await data.binds();

        logger('Seeding database with SQL %s and data: %o', data.sql, binds);

        const result = await this.pool().query(data.sql, binds);
        logger('Result of inserting data: %o', result);

        return data;
    }
}
