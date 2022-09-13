const Router = require('express')
const router = new Router()
const adminsController = require('../controllers/adminsController')
const isAdminMiddleware = require('../middleware/isAdminMiddleware')

router.get('/', adminsController.getAll)
router.get('/:id', adminsController.getOne)
router.post('/', isAdminMiddleware, adminsController.create)
router.post('/compare', isAdminMiddleware, adminsController.compare)
router.put('/', isAdminMiddleware, adminsController.updateObj)
router.delete('/:id', isAdminMiddleware, adminsController.deleteObj)


module.exports = router

