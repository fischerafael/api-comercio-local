const Product = require('../models/Product')

module.exports = {
    async create (req, res) {
        const { prodName, prodDes, ProdPri } = req.body
        const { user_id } = req.params
        
    }
}