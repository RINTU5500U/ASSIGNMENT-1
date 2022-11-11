const productModel = require('../models/productModel')
const moment = require('moment')


module.exports = {
    createProduct: async (req, res) => {
        try {
            let data = req.body
            let {image} = data
            if (!data) {
                return res.status(400).send({ status: false, msg: "please provide data"})
            }
            //req.uplodeLink = await aws.uploadFile(image)
            let createData = await productModel.create(data)
            return res.status(201).send({ status: true, msg: "Data created successfully", Data: createData })
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            let data = req.body
            let productId = req.params.productId
            let updateData = await productModel.findByIdAndUpdate(productId,{ $set: data, updatedAt: moment().format("DD-MM-YYYY  h:mm:ss a") },{new:true})
            return res.status(200).send({status: true,msg:"Product updated successfully",Data: updateData})
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}