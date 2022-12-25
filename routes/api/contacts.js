const express = require('express')
const controllers = require('../../controllers')

const router = express.Router()

router.get('/', controllers.get)

router.get('/:contactId', controllers.getById)

router.post('/', controllers.create)

router.delete('/:contactId', controllers.remove)

router.put('/:contactId', controllers.edit)

router.patch('/:contactId/favorite', controllers.updateStatus)

module.exports = router
