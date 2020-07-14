const Product = require('../models/Product')
const Info = require('../models/Info')
const { findOneAndDelete, findById } = require('../models/Product')

module.exports = {
    async create (req, res) {
        const { prodName, prodDes, prodPri } = req.body
        const { user_id } = req.params
        const user_auth = req.user
        
        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })

        try {
            const userInfoExists = await Info.findOne({ user: user_id })            
            if (!userInfoExists) return res.status(400).send({ message: 'No user info found' })
            const userInfoId = userInfoExists._id

            const { location } = userInfoExists            
            const longitude = location.coordinates[0]
            const latitude = location.coordinates[1]            
            const setLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }      
               
            const productLimit = await Product.find({ user: user_id })
            if (productLimit.length >= 3) return res.status(400).send({ message: 'Product limit reached' })
            
            const createdProd = await Product.create({
                productName: prodName,
                productDescription: prodDes,
                productPrice: prodPri,
                user: user_id,
                info: userInfoId,
                location: setLocation
            })

            return res.status(201).send(createdProd)
        } catch (err) {
            return res.status(400).send(err)
        }
    },
    async read (req, res) {
        const { user_id } = req.params

        try {
            const productsByUser = await Product.find({ user: user_id })

            return res.status(200).send(productsByUser)
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    async update (req, res) {        
        const { user_id, product_id } = req.params
        const { prodName, prodDes, prodPri } = req.body
        const user_auth = req.user

        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })
        
        try {
            const productExists = await Product.findById(product_id)
            if (!productExists) return res.status(400).send({ message: 'Product does not exist' })
            
            const prodUser = productExists.user
            if (prodUser != user_id) return res.status(400).send({ message: 'Unauthorized' })

            const updatedProduct = await Product.findOneAndUpdate({
                _id: product_id
            },{
                productName: prodName,
                productDescription: prodDes,
                productPrice: prodPri
            }, {
                new: true
            })

            return res.status(200).send(updatedProduct)
        } catch (err) {
            return res.status(400).send(err)
        }        
    },
    async delete (req, res) {
        const { user_id, product_id } = req.params
        const user_auth = req.user
        
        if (user_id !== user_auth) return res.status(401).send({ message: 'Unauthenticated' })

        try {
            const deletedProduct = await Product.findByIdAndDelete(product_id)
            
            return res.status(200).send(deletedProduct)
        } catch (err) {
            return res.status(400).send(err)
        }
    }
}