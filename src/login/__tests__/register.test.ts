import { Request, Response } from 'express';
import { UserService } from '../../users';
import * as testSubject from '../register';

describe('register', () => {
    const userService = {} as UserService;

    describe('When no values are provided', () => {
        it('Renders the correct view', async () => {
            const request = {
                body: {
                    username: 'testuser',
                    action: 'register',
                },
            } as Request;
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.register(request, response, userService);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/register', {
                username: 'testuser',
                email: undefined,
                name: undefined,
                problems: {
                    email: ['missing'],
                    name: ['missing'],
                    password: ['missing'],
                    password2: ['missing'],
                },
            });
        });
    });

    describe('When the passwords don\'t match are provided', () => {
        it('Renders the correct view', async () => {
            const request = {
                body: {
                    username: 'testuser',
                    email: 'known@example.com',
                    name: 'Graham',
                    password: 'password',
                    password2: 'passwrd',
                    action: 'register',
                },
            } as Request;
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.register(request, response, userService);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/register', {
                username: 'testuser',
                email: 'known@example.com',
                name: 'Graham',
                problems: {
                    password2: ['mismatch'],
                },
            });
        });
    });

});
