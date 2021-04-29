const crypto = require('crypto');
const algorithm = 'aes-192-cbc';
const password = 'uHek3fXGiSy3TUhLrkqXI7R03BXHk8suo00n5V5NK';

module.exports.encrypt = function(str) {
    let key = crypto.scryptSync(password, 'salt', 24);
    let iv = Buffer.alloc(16);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedId = cipher.update(str, 'utf8', 'hex');
    encryptedId += cipher.final('hex');
    return encryptedId;
}

module.exports.decrypt = function(str) {
    let key = crypto.scryptSync(password, 'salt', 24);
    let iv = Buffer.alloc(16);
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(str, 'hex', 'utf8');
    decrypted += decipher.final();
    return decrypted;
}

module.exports.generateHash = function(str) {
    return crypto.randomBytes(20).toString('hex');
}