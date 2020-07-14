const express = require('express')
const cors = require('cors')
const router = require('./router')
const dbConnection = require('./dbConnection')

module.exports = function serverSetup (port) {  
    const app = express()
    dbConnection()
    app.use(cors())
    app.use(express.json())
    app.use(router)    
    app.listen(process.env.PORT || port, () => console.log(`Server running on port ${port}`))
}