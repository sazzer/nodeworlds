import debug from 'debug';
import { Request, Response } from 'express';
import { UserService } from '../users';
import { register } from './register';
import { startLogin } from './start';

/** The logger to use */
const logger = debug('nodeworlds:login:handler');

/**
 * Handler for the login process
 * @param req the request
 * @param res the response
 */
export async function loginHandler(req: Request, res: Response, userService: UserService) {
    switch (req.body.action) {
        case 'login':
            logger('Processing Login request');
            startLogin(req, res, userService);
            break;
        case 'register':
            logger('Processing User Registration');
            register(req, res, userService);
            break;
        default:
            logger('Starting Login process');
            startLogin(req, res, userService);
            break;
    }
}
