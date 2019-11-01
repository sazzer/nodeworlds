import 'dotenv/config';

import { buildServer } from './server';

const server = buildServer();
server.start();
