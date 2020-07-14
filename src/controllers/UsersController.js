const User = require('../models/User')

module.exports = {
    async read(req, res) {
        try {
            const allUsers = await User.find()               
            return res.status(200).send(allUsers) 
        } catch (err) {
            return res.status(400).send(err)
        }        
    }
}