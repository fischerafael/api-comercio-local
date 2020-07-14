const User = require('../models/User')
const hashPassword = require('../utils/hashPassword')

module.exports = {
    async create(req, res) {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).send({ message: 'Email or password data cannot be empty' })

        try {            
            const userExists = await User.findOne({ email })            
            if (userExists) return res.status(409).send({ message: 'User already exists' }) 

            const hashedPassword = await hashPassword(password) 

            const createUser = await User.create({
                email,
                password: hashedPassword
            })

            return res.status(201).send({ message: `User ${createUser.email} successfully created` }) 
        } catch (err) {
            return res.status(400).send(err)
        }
    }, 
    async read(req, res) {
        const { user_id } = req.params
        console.log(user_id)

        try { 
            const foundUser = await User.findById(user_id)
            return res.status(200).send(foundUser)
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async update(req, res) {       
        const { email, password } = req.body
        const { user_id } = req.params
        const user_auth = req.user        

        if (!email || !password) return res.status(400).send({ message: 'Email or password data cannot be empty' })    
        
        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })
         
        try {            
            const userExists = await User.findOne({ email })            
            if (userExists) return res.status(409).send({ message: 'User already exists' })

            const hashedPassword = await hashPassword(password) 

            const updatedUser = await User.findByIdAndUpdate({ _id: user_id }, {
                email,
                password: hashedPassword
            }, { new: true })

            return res.status(200).send(updatedUser)
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async delete(req, res) {
        const { user_id } = req.params  
        const user_auth = req.user      
        
        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })

        try {            
            const deletedUser = await User.findOneAndDelete({ _id: user_id })            
            return res.status(200).send({ message: `User ${deletedUser.email} successfully deleted` })
        } catch (err) {
            return res.status(400).send(err)
        } 
    }
}