/* istanbul ignore file */
import { Router } from 'express';
import { RegisterRoutes } from '../server';

/**
 * Module representing the home screen
 */
export class HomeModule implements RegisterRoutes {
    /**
     * Register all appropriate routes with the router
     * @param router The router to register the routes on
     */
    public registerRoutes(router: Router) {
        router.get('/', (req, res) => {
            res.render('homepage');
        });

        router.get('/landing', (req, res) => {
            res.redirect('/static/fantasy-world.jpg');
        });
    }
}
