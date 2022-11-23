const crypto = require('crypto');
const fs = require('fs')
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
/*
node encryption <filename>
*/
function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key:key.toString('hex')};
}

let fileName = process.argv[2]
let data = fs.readFileSync(fileName).toString()
let ed = encrypt(data)
fs.writeFileSync(`encrypted${fileName}`, ed.encryptedData)
console.log({key: ed.key, iv: ed.iv})