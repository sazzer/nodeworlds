import 'dotenv/config';

import { build } from './main';

build()
    .then(server => server.start());
