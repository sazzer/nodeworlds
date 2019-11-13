import { Request, Response } from 'express';
import { Model } from '../../api';
import { UserData, UserId, UserRetriever } from '../../users';
import * as testSubject from '../start';

describe('startLogin', () => {
    const userRetriever = {} as UserRetriever;

    describe('When no username is present', () => {
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

    describe('When an unknown username is present', () => {
        const request = {
            body: {
              username: 'unknown',
            },
        } as Request;

        beforeEach(() => {
            userRetriever.findUserByUsername = jest.fn().mockReturnValue(Promise.resolve(undefined));
        });

        it('Renders the correct view', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/register', { username: 'unknown' });
        });

        it('Calls the User Retriever as expected', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(userRetriever.findUserByUsername).toBeCalledTimes(1);
            expect(userRetriever.findUserByUsername).toBeCalledWith('unknown');
        });
    });

    describe('When a known username is present', () => {
        const request = {
            body: {
              username: 'testuser',
            },
        } as Request;

        beforeEach(() => {
            userRetriever.findUserByUsername = jest.fn()
            .mockReturnValue(Promise.resolve({} as Model<UserId, UserData>));
        });

        it('Renders the correct view', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(response.render).toBeCalledTimes(1);
            expect(response.render).toBeCalledWith('login/login', { username: 'testuser' });
        });

        it('Calls the User Retriever as expected', async () => {
            const response = {} as Response;
            response.render = jest.fn().mockReturnValue(response);

            await testSubject.startLogin(request, response, userRetriever);

            expect(userRetriever.findUserByUsername).toBeCalledTimes(1);
            expect(userRetriever.findUserByUsername).toBeCalledWith('testuser');
        });
    });

});
