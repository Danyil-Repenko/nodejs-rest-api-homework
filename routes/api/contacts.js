const express = require('express')
const { contactContrl } = require('../../controllers')
const { validate, authorized } = require("../../midllewares")
const { schemas } = require('../../shemas/contact')

const router = express.Router()

router.get('/', authorized, contactContrl.get)

router.get('/:contactId', authorized, contactContrl.getById)

router.post('/', validate(schemas.addSchema), authorized, contactContrl.create)

router.delete('/:contactId', authorized, contactContrl.remove)

router.put('/:contactId', validate(schemas.updateSchema), authorized, contactContrl.edit)

router.patch('/:contactId/favorite', validate(schemas.updateStatusSchema), authorized, contactContrl.updateStatus)

module.exports = router
