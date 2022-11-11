const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId

const upiSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    upiId: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: String,
        required: true,
        default: moment().format("DD-MM-YYYY  h:mm:ss a"),
    },
    updatedAt: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('Upi', upiSchema)