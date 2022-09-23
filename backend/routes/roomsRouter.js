const Router = require('express')
const router = new Router()
const roomsController = require('../controllers/roomsController')
const isAdminMiddleware = require("../middleware/isAdminMiddleware");


router.get('/', isAdminMiddleware, roomsController.getAll)
router.get('/:id', isAdminMiddleware, roomsController.getOne)
router.post('/', isAdminMiddleware, roomsController.create)
router.put('/', isAdminMiddleware, roomsController.updateObj)
router.delete('/:id', isAdminMiddleware, roomsController.deleteObj)

module.exports = router

