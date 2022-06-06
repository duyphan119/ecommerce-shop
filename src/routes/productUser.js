const router = require("express").Router();
const productUserController = require("../controllers/productUserController");
const { getUser } = require("../middlewares/authMiddleware");

router.post("/", productUserController.create);

router.delete(
  "/product/:product_id",
  getUser,
  productUserController.destroyByProduct
);
router.delete("/:product_user_id", productUserController.destroy);

module.exports = router;
