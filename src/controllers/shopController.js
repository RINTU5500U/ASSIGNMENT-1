const shopModel = require('../models/shopModel')
const moment = require('moment')

module.exports = {
    createShop: async (req, res) => {
        try {
            let data = req.body
            let createData = await shopModel.create(data)
            return res.status(201).send({ status: true, msg: "Shop created successfully", Data: createData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },

    updateShop: async (req, res) => {
        try {
            let data = req.body
            let shopId = req.params.shopId
            if (!data) {
                return res.status(400).send({ status: false, msg: "please enter data what ever You want to update" })
            }
            let updateData = await shopModel.findByIdAndUpdate(shopId, { $set: data, updatedAt: moment().format("DD-MM-YYYY  h:mm:ss a") },{new:true})
            return res.status(200).send({ status: true, msg: "Shop updated successfully", Data: updateData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}