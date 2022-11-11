const express = require("express")
const router = express.Router()

const {userValidation,shopValidation,productValidation,bankValidation,upiValidation} = require('../middleware/validMiddleware')
const {createUser, login} = require('../controllers/userController')
const {createShop,updateShop} = require('../controllers/shopController')
const {createProduct,updateProduct} = require('../controllers/productController')
const {accountSettup,upiSettup} = require('../controllers/paymentController')
const {authentication,authorization} = require('../middleware/auth')

router.post('/createUser',userValidation,createUser)
router.post('/login',login)
router.post('/createShop',shopValidation,authentication,createShop)
router.put('/updateShop/:shopId',authentication,authorization,updateShop)
router.post('/createProduct',productValidation,authentication,createProduct)
router.put('/updateProduct/:productId',authentication,authorization,updateProduct)
router.post('/accountSettup',bankValidation,authentication,accountSettup)
router.post('/upiSettup',upiValidation,authentication,upiSettup)

router.all('/*',(req, res) => {try {
    return res.status(400).send({status: false,msg: "The api you request is not available"})
} catch (error) {
    return res.status(500).send({ status: false, message: error.message })
}})
module.exports = router