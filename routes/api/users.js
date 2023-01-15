const express = require('express')
const { userContrl } = require('../../controllers')
const upload = require('../../midllewares/upload')
const { validate, authorized } = require("../../midllewares")
const { schemas } = require('../../shemas/user')

const router = express.Router()

router.post('/register', validate(schemas.addUserSchema), upload.single('avatar'), userContrl.register)

router.get('/login', validate(schemas.loginUserSchema), userContrl.login)

router.post('/logout', authorized, userContrl.logout)

router.get('/current', authorized, userContrl.current)

router.patch('/', authorized, validate(schemas.changeSubSchema), userContrl.newSub)

router.patch('/avatars', authorized, upload.single('avatar'), userContrl.updateAvatar)

module.exports = router
