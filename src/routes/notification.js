const notificationController = require("../controllers/notificationController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", notificationController.getAll);
router.get("/:notification_id", notificationController.getById);

router.post("/", verifyToken, notificationController.create);

router.put("/", verifyToken, notificationController.update);

router.delete("/:notification_id", verifyToken, notificationController.destroy);

module.exports = router;
