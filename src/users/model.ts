import { Password } from './password';

/**
 * Theshape of the data representing a user
 *
 * @export
 * @interface UserData
 */
export interface UserData {
    /** The users email address */
    email: string;

    /** The users name */
    name: string;

    /** The users password */
    password: Password;
}
