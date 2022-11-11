const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId

const shopSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    storeName: {
        type: String,
        required: true,
        trim: true
    },
    businessCategory: {
        type: String,
        trim: true
    },
    gst: {
        type: Number,
        default: 0
    },
    address: {
        state: {
            type: String,
            trim: true
        },
        place: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        }
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

module.exports = mongoose.model('Shop',shopSchema)