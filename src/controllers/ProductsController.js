const Product = require('../models/Product')

module.exports = {
    async read(req, res) {
        let { longitude, latitude, maxDist = 10 } = req.query 
        
        if (maxDist > 20) {maxDist = 20} 
        const maxDistance = (maxDist*1000)

        try { 
            const foundProducts = await Product.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: maxDistance
                    }
                }
            }).populate('info')
            
            return res.status(200).send(foundProducts)
        } catch(err) {
            return res.status(400).send(err)
        }      
    }
}