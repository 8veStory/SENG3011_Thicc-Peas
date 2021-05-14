const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * JSON Stringifies the input and then SHA256's it.
 * @param {any} input 
 */
function hashSHA256(input) {
    return crypto.createHash('SHA256').update(JSON.stringify(input)).digest('hex');
}

/**
 * Hashes a password using salt + hash.
 * @param {String} plainTextPassword 
 * @returns 
 */
async function saltAndHashPasswordAsync(plainTextPassword) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    return hash;
}

/**
 * Compares a plain-text password agianst a salt and hashed password.
 * @param {String} plainTextPassword 
 * @param {String} encryptedPassword 
 * @returns 
 */
async function compareAgainstHashedPasswordAsync(plainTextPassword, encryptedPassword) {
    let result = await bcrypt.compare(plainTextPassword, encryptedPassword);
    return result;
}

/**
 * Compares a plain-text password agianst a salt and hashed password.
 * @param {String} plainTextPassword 
 * @param {String} encryptedPassword 
 * @returns 
 */
function compareAgainstHashedPasswordSync(plainTextPassword, encryptedPassword) {
    return bcrypt.compareSync(plainTextPassword, encryptedPassword);
}

module.exports.hashSHA256 = hashSHA256;
module.exports.saltAndHashPassword = saltAndHashPasswordAsync;
module.exports.compareAgainstHashedPassword = compareAgainstHashedPasswordAsync;
module.exports.compareAgainstHashedPasswordSync = compareAgainstHashedPasswordSync;