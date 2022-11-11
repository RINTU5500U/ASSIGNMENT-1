const bankModel = require('../models/paymentModel/bankModel')
const upiModel = require('../models/paymentModel/upiModel')


module.exports = {
    accountSettup: async (req, res) => {
        try {
            let data = req.body
            let createData = await bankModel.create(data)
            return res.status(201).send({status: false, msg: "Account settop successfully",Data: createData})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    upiSettup: async (req, res) => {
        try {
            let data = req.body
            let createData = await upiModel.create(data)
            return res.status(201).send({status: false, msg: "UPI settop successfully",Data: createData})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}