const express = require('express')
const { userContrl } = require('../../controllers')
const { validate } = require("../../helpers")
const { schemas } = require('../../shemas/user')

const router = express.Router()

router.post('/register', validate(schemas.addUserSchema), userContrl.register)

router.get('/login', validate(schemas.loginUserSchema), userContrl.login)

router.post('/logout')

router.get('/curent')

module.exports = router
