import { UserRetriever, UserService } from './api';
import { UserDao } from './dao';

/**
 * Module for working with Users
 *
 * @export
 * @class UsersModule
 */
export class UsersModule {
    /** The user retriever to work with */
    public readonly retriever: UserRetriever;

    /** The user service to work with */
    public readonly service: UserService;

    /**
     * Construct the user module
     * @memberof UserModule
     */
    public constructor() {
        const dao = new UserDao();
        this.retriever = dao;
        this.service = dao;
    }
}
