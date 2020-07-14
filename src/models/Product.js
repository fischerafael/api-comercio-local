const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const Schema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    info: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Info',
        required: true
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
})

module.exports = mongoose.model('Product', Schema)