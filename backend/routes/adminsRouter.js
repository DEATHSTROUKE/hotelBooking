const Router = require('express')
const router = new Router()
const adminsController = require('../controllers/adminsController')
const isAdminMiddleware = require('../middleware/isAdminMiddleware')
const isSuperAdminMiddleware = require('../middleware/isSuperAdminMiddleware')

router.get('/', isAdminMiddleware, adminsController.getAll)
router.get('/:id', isAdminMiddleware, adminsController.getOne)
router.post('/', adminsController.create)
router.post('/compare', isAdminMiddleware, adminsController.compare)
router.put('/', isSuperAdminMiddleware, adminsController.updateObj)
router.delete('/:id', isSuperAdminMiddleware, adminsController.deleteObj)


module.exports = router

