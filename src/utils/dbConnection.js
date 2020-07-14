const mongoose = require('mongoose')
require('dotenv').config()

const dbURI = process.env.DB_URI 

module.exports = function dbConnection() {        
    mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }, () => console.log('Connected to Database'))     
}
