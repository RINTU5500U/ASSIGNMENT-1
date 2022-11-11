const validation = require('../utilities/validator')

module.exports = {

    userValidation: (req, res, next) => {
        const { error } = validation.userModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    shopValidation: (req, res, next) => {
        const { error } = validation.shopModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    productValidation: (req, res, next) => {
        const { error } = validation.productModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    bankValidation: (req, res, next) => {
        const { error } = validation.bankModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    },
    upiValidation: (req, res, next) => {
        const { error } = validation.upiModel.validate(req.body)
        if (error) {
            return res.status(400).send({ status: false, message: error.message })
        } else next()
    }
}