import { Password } from './password';

/** The type representingthe ID of a usr */
export type UserId = string;

/**
 * Theshape of the data representing a user
 *
 * @export
 * @interface UserData
 */
export interface UserData {
    /** The users username */
    username: string;

    /** The users email address */
    email: string;

    /** The users name */
    name: string;

    /** The users password */
    password: Password;
}
