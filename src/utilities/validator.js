const joi = require('joi')
joi.objectId = require('joi-objectid')(joi)

const passwordResponse = { 'string.pattern.base': ` "Password should be minimum 8 and maximum 15 character.It contains atleast--> 1 Uppercase letter, 1 Lowercase letter, 1 Number, 1 Special character"` }
const number = (check) => {
    let messages = { "number.base": `${check} should be a type of 'number'.`, "number.empty": `${check} cannot be an empty field.`, "any.required": `${check} is a required field.` }
    return messages
}
const errors = (check) => {
    let messages = { "string.base": `${check} should be a type of 'String'.`, "string.empty": `${check} cannot be an empty field.`, "any.required": `${check} is a required field.` }
    return messages
}

module.exports = {
    userModel: joi.object({
        title: joi.string().trim().regex(/^(Mr|Mrs|Miss)+$\b/).messages({ 'string.pattern.base': `Title should be among [Mr,Mrs,Miss]` }).required().messages(errors("Title")),
        userName: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `User name is not valid.` }).required().messages(errors("User name")),
        phone: joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits only.` }).required().messages(number('Mobile number')),
        email: joi.string().trim().regex(/.+\@.+\..+/).messages({ 'string.pattern.base': `emailId is in inValid format` }).required().messages(errors("emailId")),
        password: joi.string().trim().min(6).messages({ 'string.min': 'password should be minimum 6 characters' }).max(15).messages({ 'string.max': 'password should be maximum 15 characters' }).regex(/^\S{8,24}$/).messages(passwordResponse).required().messages(errors("Password")),
    }),
    shopModel: joi.object({
        userId: joi.objectId().required().messages(),
        storeName: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Store name is not valid.` }).required().messages(errors('Store name')),
        businessCategory: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Store name is not valid.` }).messages(errors('Business category')),
        gst: joi.number().messages(number('GST')),
        address: {
            state: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Store name is not valid.` }).messages(errors('State')),
            place: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Store name is not valid.` }).messages(errors('Place')),
            pincode: joi.string().trim().regex(/^([0-9]{6})$/).messages({ 'string.pattern.base': `Pincode is inValid` }).messages(errors('Place'))
        }
    }),
    productModel: joi.object({
        userId: joi.objectId().required().messages(),
        name: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `name is not valid.` }).required().messages(errors("Product name")),
        //image: joi.string().trim().regex(/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i).messages({ 'string.pattern.base': `name is not valid.` }).messages(),
        category: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `name is not valid.` }).messages(errors("Product category")),
        price: joi.number().messages(number('Price')),
        quantity: joi.number().messages(number('Quantity')),
        discounts: joi.number().messages(number('discounts'))
    }),
    bankModel: joi.object({
        userId: joi.objectId().required().messages(),
        title: joi.string().trim().regex(/^(Mr|Mrs|Miss)+$\b/).messages({ 'string.pattern.base': `Title should be among [Mr,Mrs,Miss]` }).required().messages(errors("Title")),
        accountHolder: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Account holder is not valid.` }).required().messages(errors("Account holder")),
        accountTypes: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Account type is not valid.` }).messages(errors("Account type")),
        bankName: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Account types is not valid.` }).required().messages(errors("Bank name")),
        branch: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `Branch name is not valid.` }).required().messages(errors("Branch name")),
        accountNo: joi.string().trim().regex(/^\d{9,18}$/).messages({ 'string.pattern.base': `Account number is not valid.` }).required().messages(errors("Account number")),
        IFSC: joi.string().trim().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/).messages({ 'string.pattern.base': `IFSC code is not valid.` }).required().messages(errors("IFSC code")),
        MICR: joi.string().trim().regex(/^[0-9]{1,9}$/).messages({ 'string.pattern.base': `MICR number is not valid.` }).required().messages(errors("MICR number")),
        pincode: joi.string().trim().regex(/^([0-9]{6})$/).messages({ 'string.pattern.base': `Pincode is inValid` }).required().messages(errors("Pincode")),
        city: joi.string().trim().regex(/^[A-Za-z ]+$/).messages({ 'string.pattern.base': `city is inValid` }).required().messages(errors("City")),
    }),
    upiModel: joi.object({
        userId: joi.objectId().required().messages(),
        upiId: joi.string().trim().regex(/^[\w.-]+@[\w.-]+$/).messages({ 'string.pattern.base': `UPI ID is inValid` }).required().messages(errors("Upi Id")),
        phone: joi.string().trim().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits only.` }).required().messages(number('Mobile number')),
    })
}