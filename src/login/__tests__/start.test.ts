import { Request, Response } from 'express';
import { Model } from '../../api';
import { UserData, UserId, UserRetriever } from '../../users';
import * as testSubject from '../start';

describe('startLogin', () => {
    const userRetriever = {} as UserRetriever;

    describe('When no email is present', () => {
        const request = {
            body: {

            },
        } as Request;

        it('Renders the correct view', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/start');
        });
    });

    describe('When an unknown email is present', () => {
        const request = {
            body: {
                email: 'unknown@example.com',
            },
        } as Request;

        beforeEach(() => {
            userRetriever.findUserByEmail = jest.fn().mockReturnValue(Promise.resolve(undefined));
        });

        it('Renders the correct view', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/register', { email: 'unknown@example.com' });
        });

        it('Calls the User Retriever as expected', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(userRetriever.findUserByEmail).toBeCalledTimes(1);
            expect(userRetriever.findUserByEmail).toBeCalledWith('unknown@example.com');
        });
    });

    describe('When a known email is present', () => {
        const request = {
            body: {
                email: 'known@example.com',
            },
        } as Request;

        beforeEach(() => {
            userRetriever.findUserByEmail = jest.fn().mockReturnValue(Promise.resolve({} as Model<UserId, UserData>));
        });

        it('Renders the correct view', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/login', { email: 'known@example.com' });
        });

        it('Calls the User Retriever as expected', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(userRetriever.findUserByEmail).toBeCalledTimes(1);
            expect(userRetriever.findUserByEmail).toBeCalledWith('known@example.com');
        });
    });

});
