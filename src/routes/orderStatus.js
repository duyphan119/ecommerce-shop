const router = require("express").Router();
const orderStatusController = require("../controllers/orderStatusController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", orderStatusController.getAll);
router.get("/:order_status_id", orderStatusController.getById);

router.post("/", orderStatusController.create);

router.put("/", orderStatusController.update);

router.delete("/:order_status_id", verifyAdmin, orderStatusController.destroy);

module.exports = router;
