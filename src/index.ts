import 'dotenv/config';

import config from 'config';
import pino from 'pino';

const logger = pino({ name: 'nodeworlds' });

const httpPort = config.get('http.port');

logger.info('Testing: %s', httpPort);
