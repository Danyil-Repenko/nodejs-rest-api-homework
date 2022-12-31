const express = require('express')
const { userContrl } = require('../../controllers')

const router = express.Router()

router.post('/register', userContrl.register)

router.get('/login')

router.post('/logout')

router.get('/curent')

module.exports = router
