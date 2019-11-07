import debug from 'debug';
import { Request, Response } from 'express';
import { UserService } from '../users';

/** The logger to use */
const logger = debug('nodeworlds:login:register');

/**
 * Handler for user registration
 * @param req the request
 * @param res the response
 */
export async function register(req: Request, res: Response, userService: UserService) {
    const email = req.body.email;

    const problems: { [key: string]: string[] } = {};

    ['email', 'name', 'password', 'password2'].forEach(field => {
        problems[field] = [];
        if ((req.body[field] || '').trim() === '') {
            problems[field].push('missing');
        }
    });

    if (req.body.password !== req.body.password2) {
        problems.password2.push('mismatch');
    }

    Object.entries(problems).forEach(([key, value]) => {
        if (value.length === 0) {
            delete problems[key];
        }
    });
    logger('Problems with registration: %o', problems);

    return res.render('login/register', {
        email,
        name: req.body.name,
        problems,
    });
}
