const Router = require("express");
const router = new Router();
const roomsRouter = require("./roomsRouter");
const bookingRouter = require("./bookingRouter");
const adminsRouter = require("./adminsRouter");

router.use("/rooms", roomsRouter);
router.use("/booking", bookingRouter);
router.use("/admins", adminsRouter);

module.exports = router;
