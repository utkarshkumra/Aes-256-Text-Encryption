const crypto = require('crypto');
const fs = require('fs')
/*
node decryption <file name> <key> <iv>
*/
function decrypt(encrypted, iv, key) {
    iv = Buffer.from(iv, 'hex');
    encrypted = Buffer.from(encrypted, 'hex');
    key = Buffer.from(key, 'hex')

    let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

let encryptedFileName = process.argv[2]
let key = process.argv[3]
let iv = process.argv[4]

let encryptedData = fs.readFileSync(encryptedFileName).toString()

let decryptedData = decrypt(encryptedData, iv, key)
fs.writeFileSync(`decrypted${encryptedFileName}`, decryptedData)