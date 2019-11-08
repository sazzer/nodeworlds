import * as bcrypt from 'bcrypt';

/** Type representing a hashed password */
export type Password = string;

/** The number of salt rounds to use */
const SALT_ROUNDS = 10;

/**
 * Hash the given plaintext password
 *
 * @export
 * @param {string} plaintext the plaintext password
 * @returns {Password} the hashed password
 */
export async function hashPassword(plaintext: string): Promise<Password> {
    return await bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Compare the given plaintext and hashed password to see if they match
 *
 * @export
 * @param {string} plaintext the plaintext password
 * @param {Password} hashed the hashed password
 * @returns {boolean} true if the two match. False if not
 */
export async function comparePasswords(plaintext: string, hashed: Password): Promise<boolean> {
    return bcrypt.compare(plaintext, hashed);
}
