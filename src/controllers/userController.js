const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        let data = req.body
        let { email, phone } = data
        let uniqueData = await userModel.find({ $or: [{ phone: phone }, { email: email }] })

        let arr = []
        uniqueData.map((i) => { arr.push(i.phone, i.email) })

        if (arr.includes(phone)) {
            return res.status(409).send({ status: false, msg: "phone is already exsits" })
        }
        if (arr.includes(email)) {
            return res.status(409).send({ status: false, msg: "email is already exsits" })
        }
        let createUserdata = await userModel.create(data)
        return res.status(201).send({ status: true, message: "Data created successfully", data: createUserdata })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const login = async (req, res) => {
    try {
        let { email, password, phone } = req.body
        if (!email && !phone) {
            return res.status(400).send({ status: false, msg: "please enter your email or phone number to login" })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "please enter your password to login" })
        }
        let findData = await userModel.findOne({ $and: [{ $or: [{ email: email }, { phone: phone }] }, { password: password }] })
        if (!findData) {
            return res.status(404).send({ status: false, msg: "either email or password is incorrect" })
        }
        let token = jwt.sign({ userId: findData._id }, 'Secret Key')
        res.setHeader("token", token)
        return res.status(200).send({ status: true, msg: "LoggedIn successfully", token: token })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUser, login }