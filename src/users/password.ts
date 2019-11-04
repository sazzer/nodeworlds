import * as argon2 from 'argon2';

/** Type representing a hashed password */
export type Password = string;

/**
 * Hash the given plaintext password
 *
 * @export
 * @param {string} plaintext the plaintext password
 * @returns {Password} the hashed password
 */
export async function hashPassword(plaintext: string): Promise<Password> {
    return await argon2.hash(plaintext, {
        type: argon2.argon2id,
    });
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
    return argon2.verify(hashed, plaintext);
}
