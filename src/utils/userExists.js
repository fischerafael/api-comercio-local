const User = require('../models/User')

module.exports = async function userExists(email) {
    try {
        console.log(email)
        const userExists = await User.findOne({ email: email })       
        console.log(userExists)  
        return userExists        
    } catch (err) {
        return err
    }
}