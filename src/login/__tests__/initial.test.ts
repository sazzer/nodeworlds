import { Request, Response } from 'express';
import * as testSubject from '../initial';

describe('initialLoginForm', () => {
    it('Renders the correct view', () => {
        const request = {} as Request;

        const response = {} as Response;
        response.render = jest.fn().mockReturnValue(response);

        testSubject.initialLoginForm(request, response);

        expect(response.render).toBeCalledTimes(1);
        expect(response.render).toBeCalledWith('login/start');
    });
});
