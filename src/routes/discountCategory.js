const router = require("express").Router();

const discountCategoryController = require("../controllers/discountCategoryController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", discountCategoryController.getAll);
router.get("/:discount_category_id", discountCategoryController.getById);

router.post("/", verifyAdmin, discountCategoryController.create);

router.put("/", verifyAdmin, discountCategoryController.update);

router.delete(
  "/:discount_category_id",
  verifyAdmin,
  discountCategoryController.destroy
);

module.exports = router;
