const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

const Schema = new mongoose.Schema({    
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    }, 
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Info', Schema)