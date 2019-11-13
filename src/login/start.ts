import { Request, Response } from 'express';
import { UserRetriever } from '../users';
import { initialLoginForm } from './initial';

/**
 * Handler for starting login - rendering either the Login or Register form
 * @param req the request
 * @param res the response
 */
export async function startLogin(req: Request, res: Response, userRetriever: UserRetriever) {
    const username = req.body.username;

    if (username) {
        const user = await userRetriever.findUserByUsername(username);
        const view = user === undefined ? 'login/register' : 'login/login';
        return res.render(view, { username });
    } else {
        return initialLoginForm(req, res);
    }
}
