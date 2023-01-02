const express = require('express')
const { userContrl } = require('../../controllers')
const { validate } = require("../../heplers")
const { schemas } = require('../../shemas/user')

const router = express.Router()

router.post('/register', validate(schemas.addUserSchema), userContrl.register)

router.get('/login')

router.post('/logout')

router.get('/curent')

module.exports = router
