const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('auth')
    if (!token) return res.status(401).send('No token')

    try {
        const verifiedToken = jwt.verify(token, process.env.API_TOKEN)            
        req.user = verifiedToken._id
        return next()
    } catch(err) {       
        res.status(400).send('Invalid token')
    }
}