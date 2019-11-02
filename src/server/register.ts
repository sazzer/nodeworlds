import { Router } from 'express';
/**
 * Base interface for any module that can contribute routes to the server
 */
export interface RegisterRoutes {
    /**
     * Register all appropriate routes with the router
     * @param router The router to register the routes on
     */
    registerRoutes(router: Router): void;
}
