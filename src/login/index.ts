import { Router } from 'express';
import { RegisterRoutes } from '../server';
import { initialLoginForm } from './initial';
import { startLogin } from './start';

/**
 * Module representing the login screen
 */
export class LoginModule implements RegisterRoutes {
    /**
     * Register all appropriate routes with the router
     * @param router The router to register the routes on
     */
    public registerRoutes(router: Router) {
        router.get('/login', initialLoginForm);
        router.post('/login', (req, res) => {
            if (req.body.email) {
                return startLogin(req, res);
            } else {
                return initialLoginForm(req, res);
            }
        });
    }
}
