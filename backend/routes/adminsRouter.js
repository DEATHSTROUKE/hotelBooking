const Router = require('express')
const router = new Router()
const adminsController = require('../controllers/adminsController')
const isAdminMiddleware = require('../middleware/isAdminMiddleware')

router.get('/', isAdminMiddleware, adminsController.getAll)
router.get('/:id', isAdminMiddleware, adminsController.getOne)
router.post('/', adminsController.create)
router.post('/compare', isAdminMiddleware, adminsController.compare)
router.put('/', isAdminMiddleware, adminsController.updateObj)
router.delete('/:id', isAdminMiddleware, adminsController.deleteObj)


module.exports = router

