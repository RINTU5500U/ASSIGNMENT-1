const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.Schema.Types.ObjectId

const bankSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        enum: ['Mr', 'Miss', 'Mrs'],
        required: true
    },
    accountHolder: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        //required: true,
        default: 'Saving'
    },
    bankName: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
        unique: true
    },
    IFSC: {
        type: String,
        required: true
    },
    MICR: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
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

module.exports = mongoose.model('BankAccount', bankSchema)