import { Router } from 'express';
import { RegisterRoutes } from '../server';
import { UsersModule } from '../users';
import { loginHandler } from './handler';
import { initialLoginForm } from './initial';

/**
 * Module representing the login screen
 */
export class LoginModule implements RegisterRoutes {
    /** The users module to use */
    private usersModule: UsersModule;

    /**
     * Construct the Login Module
     * @param {UsersModule} usersModule
     * @memberof LoginModule
     */
    public constructor(usersModule: UsersModule) {
        this.usersModule = usersModule;
    }
    /**
     * Register all appropriate routes with the router
     * @param router The router to register the routes on
     */
    public registerRoutes(router: Router) {
        router.get('/login', initialLoginForm);
        router.post('/login', (req, res) => loginHandler(req, res, this.usersModule.service));
    }
}
