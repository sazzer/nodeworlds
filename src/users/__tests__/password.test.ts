import * as testSubject from '../password';

describe('Hashing Passwords', () => {
    it('Generates a different string from the plaintext', async () => {
        const hashed = await testSubject.hashPassword('password');
        expect(hashed).not.toEqual('password');
    });

    it('Generates a different string on each hash attempt', async () => {
        const hashes = [];
        for (let i = 0; i < 10; ++i) {
            const hashed = await testSubject.hashPassword('password');
            expect(hashes).not.toContain(hashed);
            hashes.push(hashed);
        }
    });
});

describe('Comparing passwords', () => {
    let hashed: testSubject.Password;

    beforeEach(async () => {
        hashed = await testSubject.hashPassword('password');
    });

    it('Compares to the correct password', async () => {
        expect(await testSubject.comparePasswords('password', hashed)).toBe(true);
    });

    it('Doesn\'t compare to the incorrect password', async () => {
        expect(await testSubject.comparePasswords('wrong', hashed)).toBe(false);
    });

    it('Doesn\'t compare to the hashed password', async () => {
        expect(await testSubject.comparePasswords(hashed, hashed)).toBe(false);
    });

    it('Doesn\'t compare to a newly hashed password', async () => {
        const rehashed = await testSubject.hashPassword('password');
        expect(await testSubject.comparePasswords(rehashed, hashed)).toBe(false);
    });
});
