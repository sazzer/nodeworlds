import debug from 'debug';
import { GenericContainer, StartedTestContainer } from 'testcontainers';
import { migrateDb } from './migrate';

/** The logger to use */
const logger = debug('nodeworlds:database:testWrapper');

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

    /**
     * Start the container
     *
     * @memberof DatabaseTestWrapper
     */
    public async start() {
        logger('Starting database');
        this.container = await new GenericContainer('postgres', '11.5-alpine')
            .withExposedPorts(5432)
            .withEnv('POSTGRES_DB', 'nodeworlds-test')
            .withEnv('POSTGRES_USER', 'nodeworlds-test')
            .withEnv('POSTGRES_PASSWORD', 'nodeworlds-test')
            .start();

        this.url = `postgresql://nodeworlds-test:nodeworlds-test@${this.container.getContainerIpAddress()}:${this.container.getMappedPort(5432)}/nodeworlds-test`;
        logger('Started database: %s', this.url);

        await migrateDb(this.url);
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
}
