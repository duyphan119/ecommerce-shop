const router = require("express").Router();
const productMaterialController = require("../controllers/productMaterialController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", productMaterialController.getAll);
router.get("/:product_material_id", productMaterialController.getById);

router.post("/", verifyAdmin, productMaterialController.create);

router.put("/", verifyAdmin, productMaterialController.update);

router.delete("/", verifyAdmin, productMaterialController.destroy);
router.delete(
  "/:product_material_id",
  verifyAdmin,
  productMaterialController.destroyMany
);

module.exports = router;
