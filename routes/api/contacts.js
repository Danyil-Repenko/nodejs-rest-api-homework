const express = require('express')
const { contactContrl } = require('../../controllers')

const router = express.Router()

router.get('/', contactContrl.get)

router.get('/:contactId', contactContrl.getById)

router.post('/', contactContrl.create)

router.delete('/:contactId', contactContrl.remove)

router.put('/:contactId', contactContrl.edit)

router.patch('/:contactId/favorite', contactContrl.updateStatus)

module.exports = router
