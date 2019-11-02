import { HomeModule } from './home';
import { buildServer, Server } from './server';

/**
 * Build the entire application ready to run
 */
export function build(): Server {
    const home = new HomeModule();

    const server = buildServer([home]);

    return server;
}
