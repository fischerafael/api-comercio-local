const bcrypt = require('bcrypt')

module.exports = async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(password, salt)
        return encryptedPassword;
    }
    catch (err) {
        return err
    }
}
