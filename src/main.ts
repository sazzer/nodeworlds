import { DatabaseModule } from './database';
import { HomeModule } from './home';
import { LoginModule } from './login';
import { buildServer, Server } from './server';
import { UsersModule } from './users';
/**
 * Build the entire application ready to run
 */
export function build(): Server {
    const databaseModule = new DatabaseModule();

    const usersModule = new UsersModule();

    const server = buildServer([
        new HomeModule(),
        new LoginModule(usersModule),
    ]);

    return server;
}
