const express = require('express')
const router = express.Router() //引用express路由器

const home = require('./modules/home') //載入home模組
const restaurants = require('./modules/restaurants') //載入restaurants模組
const users = require('./modules/users') // 載入users模組
const { authenticator } = require('../middleware/auth') //掛載middleware
const auth = require('./modules/auth') //引用atuh模組

router.use( '/restaurants'  ,authenticator, restaurants ) //網址結構符合/restaurants字串的request導向restaurants模組
router.use( '/users' , users)
router.use( '/auth' , auth )
router.use( '/' ,authenticator, home ) //網址結構符合/字串的request導向home模組

module.exports = router // 匯出路由器