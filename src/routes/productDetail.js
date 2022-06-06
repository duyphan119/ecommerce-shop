const router = require("express").Router();
const productDetailController = require("../controllers/productDetailController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", productDetailController.getAll);
router.get("/:product_detail_id", productDetailController.getById);

router.post("/", verifyAdmin, productDetailController.create);

router.put("/", verifyAdmin, productDetailController.update);

router.delete(
  "/:product_detail_id",
  verifyAdmin,
  productDetailController.destroy
);

module.exports = router;
