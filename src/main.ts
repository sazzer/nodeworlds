import { buildServer } from './server/index';

/**
 * Build the entire application ready to run
 */
export function build() {
    const server = buildServer();
    return server;
}
