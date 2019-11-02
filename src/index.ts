import 'dotenv/config';

import { build } from './main';

const server = build();
server.start();
