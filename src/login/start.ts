import { Request, Response } from 'express';

/**
 * Handler for starting login - rendering either the Login or Register form
 * @param req the request
 * @param res the response
 */
export function startLogin(req: Request, res: Response) {
    const email = req.body.email;

    res.render('login/register', {
        email,
    });
}
