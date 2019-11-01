import config from 'config';
import pino from 'pino';

import bodyParser from 'body-parser';
import rtracer from 'cls-rtracer';
import compression from 'compression';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import responseTime from 'response-time';

const logger = pino({ name: 'server' });

/**
 * The actual HTTP Server to use
 */
class Server {
    /** The App server */
    private app: Express;

    /**
     * Construct the HTTP Server
     */
    public constructor() {
        this.app = express();
        this.app.use(rtracer.expressMiddleware());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(compression());
        this.app.use(responseTime());
        this.app.use(helmet());
        this.app.use(morgan('combined'));

        nunjucks.configure('views', {
            autoescape: true,
            throwOnUndefined: true,
            trimBlocks: true,
            lstripBlocks: true,
            watch: true,
            noCache: true,
            express: this.app,
        });
        this.app.set('view engine', 'nunjucks');

        this.app.get('/', (req, res) => {
            res.render('index');
        });

    }

    /**
     * Start the server listening
     */
    public start() {
        const httpPort = config.get('http.port');
        logger.info('Starting server on port %d...', httpPort);
        this.app.listen(httpPort);
    }
}

/**
 * Build the application server
 * @return the server
 */
export function buildServer(): Server {
    logger.debug('Building server...');
    const server = new Server();
    return server;
}
