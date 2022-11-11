const shopModel = require('../models/shopModel')
const productModel = require('../models/productModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


module.exports = {
    authentication: (req, res, next) => {
        try {
            let token = req.headers['token']
            if (!token) {
                return res.status(400).send({ status: false, message: "Token is missing" }) 
            }
            jwt.verify(token, 'Secret Key', function (error, decoded) {
                if (error) {
                    return res.status(401).send({ status: false, msg: "Authentication Failed" })
                } else {
                    req.decodedToken = decoded
                    next()
                }
            })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    authorization: async (req, res, next) => {
        try {
            let shopId = req.params.shopId
            let productId = req.params.productId
            let upiId = req.params.upiId
            if (shopId) {
                if (!mongoose.Types.ObjectId.isValid(shopId)) {
                    return res.status(400).send({ status: false, msg: "ShopId is not a valid objectId" })
                }
                let findData = await shopModel.findOne({_id:shopId,isDeleted:false})
                if (!findData) {
                    return res.status(404).send({ status: false, msg: "Shop not found" })
                }
                if (req.decodedToken.userId != findData.userId) {
                    return res.status(403).send({ status: false, msg: "Unauthorized person" })
                }
                next()
            }
            if (productId) {
                if (!mongoose.Types.ObjectId.isValid(productId)) {
                    return res.status(400).send({ status: false, msg: "ProductId is not a valid objectId" })
                }
                let findData = await productModel.findOne({_id:productId,isDeleted:false})
                if (!findData) {
                    return res.status(404).send({ status: false, msg: "Product not found" })
                }
                if (req.decodedToken.userId != findData.userId) {
                    return res.status(403).send({ status: false, msg: "Unauthorized person" })
                }
                next()
            }
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}
