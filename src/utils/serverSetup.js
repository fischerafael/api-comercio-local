const express = require('express')
const router = require('./router')
const dbConnection = require('./dbConnection')

module.exports = function serverSetup (port) {  
    const app = express()
    dbConnection()
    app.use(express.json())
    app.use(router)    
    app.listen(port, () => console.log(`Server running on port ${port}`))
}