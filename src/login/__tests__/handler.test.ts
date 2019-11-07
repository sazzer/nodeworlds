import { Request, Response } from 'express';
import { UserService } from '../../users';
import * as testSubject from '../handler';
import { register } from '../register';
import { startLogin } from '../start';

jest.mock('../register');
jest.mock('../start');

describe('loginHandler', () => {
    const userService = {} as UserService;

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('When no action is provided', () => {
        const request = {
            body: {
                email: 'fakeuser@example.com',
            },
        } as Request;

        it('Renders the correct view', () => {
            const response = {} as Response;

            testSubject.loginHandler(request, response, userService);

            expect(startLogin).toBeCalledTimes(1);
            expect(startLogin).toBeCalledWith(request, response, userService);

            expect(register).toBeCalledTimes(0);
        });
    });

    describe('When an action of \'register\' is provided', () => {
        const request = {
            body: {
                action: 'register',
                email: 'fakeuser@example.com',
            },
        } as Request;

        it('Renders the correct view', () => {
            const response = {} as Response;

            testSubject.loginHandler(request, response, userService);

            expect(register).toBeCalledTimes(1);
            expect(register).toBeCalledWith(request, response, userService);

            expect(startLogin).toBeCalledTimes(0);
        });
    });
});
