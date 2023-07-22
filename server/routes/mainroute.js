const express = require(`express`)
const router = express.Router()

router.use('/customer',require('./subroute/customerRoute'))
// router.use('/customer',require('../node_modules/abbrev/package.json'))
router.use('/admin',require('./subroute/adminRoute'))
router.use('/market',require('./subroute/marketRoute'))
router.use('/receipt',require('./subroute/receiptRoute'))
module.exports=router