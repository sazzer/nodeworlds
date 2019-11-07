/* istanbul ignore file */
import 'dotenv/config';

import { build } from './main';

build()
    .then(server => server.start());
