const Router = require('express')
const router = new Router()
const adminsController = require('../controllers/adminsController')

router.get('/', adminsController.getAll)
router.get('/:id', adminsController.getOne)
router.post('/', adminsController.create)
router.post('/compare', adminsController.compare)
router.put('/', adminsController.updateObj)
router.delete('/:id', adminsController.deleteObj)


module.exports = router

