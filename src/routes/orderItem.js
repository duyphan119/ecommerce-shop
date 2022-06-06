const router = require("express").Router();
const orderItemController = require("../controllers/orderItemController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", orderItemController.getAll);
router.get("/:order_item_id", orderItemController.getById);

router.post("/", orderItemController.create);

router.put("/", orderItemController.update);

router.delete("/:order_item_id", verifyAdmin, orderItemController.destroy);

module.exports = router;
