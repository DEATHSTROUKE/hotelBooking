const Router = require('express')
const router = new Router()
const bookingController = require('../controllers/bookingController')

router.get('/', bookingController.getAll)
router.get('/:id', bookingController.getOne)
router.post('/', bookingController.create)
router.put('/', bookingController.updateObj)
router.delete('/', bookingController.deleteObj)

module.exports = router

