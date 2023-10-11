const Router = require("express");
const router = new Router();
const bookingController = require("../controllers/bookingController");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");

router.get("/", bookingController.getAll);
router.get("/get_free_rooms", bookingController.getFreeRooms);
router.get("/:id", bookingController.getOne);
router.post("/", bookingController.create);
router.put("/", isAdminMiddleware, bookingController.updateObj);
router.delete("/:id", bookingController.deleteObj);

module.exports = router;
