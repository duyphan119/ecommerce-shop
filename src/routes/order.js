const router = require("express").Router();
const orderController = require("../controllers/orderController");
const {
  verifyTokenUserAndAdmin,
  verifyAdmin,
} = require("../middlewares/authMiddleware");

router.get("/", orderController.getAll);
router.get(
  "/user/:user_id",
  verifyTokenUserAndAdmin,
  orderController.getByUser
);
router.get("/:order_id", orderController.getById);

router.post("/", orderController.create);

router.put("/", orderController.update);

router.delete("/:order_id", verifyAdmin, orderController.destroy);

module.exports = router;
