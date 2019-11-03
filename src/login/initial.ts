import { Request, Response } from 'express';

/**
 * Handler for rendering the login form
 * @param req the request
 * @param res the response
 */
export function initialLoginForm(req: Request, res: Response) {
    res.render('login/start');
}
