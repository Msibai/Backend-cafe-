import crypto from "crypto"
const salt = "keyboardcat".toString('hex')

export default function Encrypt(password){ // utility
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hash
}