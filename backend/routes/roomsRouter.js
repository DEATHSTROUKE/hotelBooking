const Router = require("express");
const router = new Router();
const roomsController = require("../controllers/roomsController");
const isAdminMiddleware = require("../middleware/isAdminMiddleware");
const isSuperAdminMiddleware = require("../middleware/isSuperAdminMiddleware");

router.get("/", isAdminMiddleware, roomsController.getAll);
router.get("/:id", isAdminMiddleware, roomsController.getOne);
router.post("/", isSuperAdminMiddleware, roomsController.create);
router.put("/", isSuperAdminMiddleware, roomsController.updateObj);
router.delete("/:id", isSuperAdminMiddleware, roomsController.deleteObj);

module.exports = router;
