const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        //required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    discounts: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: moment().format("DD-MM-YYYY  h:mm:ss a")
    },
    updatedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Product', productSchema)