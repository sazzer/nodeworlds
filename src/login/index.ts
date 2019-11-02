import { Router } from 'express';
import { RegisterRoutes } from '../server';

/**
 * Module representing the login screen
 */
export class LoginModule implements RegisterRoutes {
    /**
     * Register all appropriate routes with the router
     * @param router The router to register the routes on
     */
    public registerRoutes(router: Router) {
        router.get('/login', (req, res) => {
            res.render('login/start');
        });
    }
}
