/* istanbul ignore file */
import config from 'config';
import debug from 'debug';

import bodyParser from 'body-parser';
import rtracer from 'cls-rtracer';
import compression from 'compression';
import express, { Express } from 'express';
import helmet from 'helmet';
import i18nextMiddleware from 'i18next-express-middleware';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import responseTime from 'response-time';

import i18n from '../i18n';
import { RegisterRoutes } from './register';

/** The logger to use */
const logger = debug('nodeworlds:server');

/**
 * Representation of the actual server
 */
export interface Server {
    start(): void;
}
/**
 * The actual HTTP Server to use
 */
class ServerImpl implements Server {
    /** The App server */
    public app: Express;

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
        this.app.use(i18nextMiddleware.handle(i18n));

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

        this.app.use('/static', express.static('static'));
    }

    /**
     * Start the server listening
     */
    public start() {
        const httpPort = config.get('http.port');
        logger('Starting server on port %d...', httpPort);
        this.app.listen(httpPort);
    }
}

/**
 * Build the application server
 * @return the server
 */
export function buildServer(routes: RegisterRoutes[]): Server {
    logger('Building server...');
    const server = new ServerImpl();

    routes.forEach(route => {
        logger('Registering routes from: %o', route);
        route.registerRoutes(server.app);
    });

    return server;
}
