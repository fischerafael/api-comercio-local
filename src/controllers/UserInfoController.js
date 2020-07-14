const Info = require('../models/Info')

module.exports = {
    async create (req, res) {
        const {
            name,
            phone,
            type,
            city,
            latitude,
            longitude
        } = req.body
        const { user_id } = req.params
        const user_auth = req.user
        
        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        try {
            const userInfoExists = await Info.findOne({ user: user_id })
            if (userInfoExists) return res.status(400).send({ message: 'User information already exists. Try to update it' })

            const createdInfo = await Info.create({
                name,
                phone,
                type,
                city,
                location,
                user: user_id
            })
            
            return res.status(201).send(createdInfo)
        } catch(err) {
            return res.status(400).send(err)
        }        
    },
    async read (req, res) {
        const { user_id } = req.params
        
        try {
            const userInfo = await Info.findOne({ user: user_id }).populate('user')
            
            return res.status(200).send(userInfo)            
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async update (req, res) {
        const {
            name,
            phone,
            type,
            city,
            latitude,
            longitude
        } = req.body
        const { user_id } = req.params
        const user_auth = req.user        

        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }

        try {
            const userInfoExists = await Info.findOne({ user: user_id })
            if (!userInfoExists) return res.status(400).send({ message: 'User information does not exist. Create it first' })
            
            const updatedUserInfo = await Info.findOneAndUpdate({ user: user_id }, {
                name,
                phone,
                type,
                city,
                location
            }, { new: true })

            return res.status(200).send(updatedUserInfo)
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}