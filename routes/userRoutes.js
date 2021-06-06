const express = require('express')
const router = express.Router()
const { registerUser, userLogin } = require('../controllers/userController')

router.post('/signup', registerUser)

router.post('/signin', userLogin)

module.exports = router