const express = require('express')
const { contactContrl } = require('../../controllers')
const { validate } = require("../../heplers")
const { schemas } = require('../../shemas/contact')

const router = express.Router()

router.get('/', contactContrl.get)

router.get('/:contactId', contactContrl.getById)

router.post('/', validate(schemas.addSchema), contactContrl.create)

router.delete('/:contactId', contactContrl.remove)

router.put('/:contactId', validate(schemas.updateSchema), contactContrl.edit)

router.patch('/:contactId/favorite', validate(schemas.updateStatusSchema), contactContrl.updateStatus)

module.exports = router
