import 'dotenv/config';
import pino from 'pino';

const logger = pino({ name: 'nodeworlds' });

logger.info('Testing: %s', process.env.TEST);
