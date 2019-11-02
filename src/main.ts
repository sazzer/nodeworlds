import { HomeModule } from './home';
import { LoginModule } from './login';
import { buildServer, Server } from './server';

/**
 * Build the entire application ready to run
 */
export function build(): Server {
    const server = buildServer([
        new HomeModule(),
        new LoginModule(),
    ]);

    return server;
}
