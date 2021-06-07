const express = require('express')
const router = express.Router()
const { registerUser, userLogin } = require('../controllers/userController')
const { regReqValidator, isRegReqValidated } = require('../validators/registerReqValidate')

router.post('/signup', regReqValidator, isRegReqValidated, registerUser)

router.post('/signin', userLogin)

module.exports = router