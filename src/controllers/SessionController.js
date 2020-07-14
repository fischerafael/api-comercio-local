const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async create(req, res) {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ message: 'Email or password data cannot be empty' })

        try {
            const userExists = await User.findOne({ email })
            console.log(userExists)
            
            if (!userExists) return res.status(409).send({ message: 'User does not exist' })
            
            const validPassword = await bcrypt.compare(password, userExists.password)
            if (!validPassword) return res.status(401).send({ message: 'Invalid password' })

            const token = jwt.sign({ _id: userExists._id }, process.env.API_TOKEN, {
                expiresIn: "1h"
            })            
            res.header('auth', token)            

            return res.status(201).send({ message: 'Logged in', token: {
                token: token,
                expiration: "1h"
            }, 
            user: {
                _id: userExists._id,
                email: userExists.email,
            }})

        } catch(err) {
            return res.status(400).send(err)
        }

    }
}