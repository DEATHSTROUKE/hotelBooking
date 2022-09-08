const Router = require('express')
const router = new Router()
const roomsController = require('../controllers/roomsController')


router.get('/', roomsController.getAll)
router.get('/:id', roomsController.getOne)
router.post('/', roomsController.create)
router.put('/', roomsController.updateObj)
router.delete('/:id', roomsController.deleteObj)

module.exports = router

