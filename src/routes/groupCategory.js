const router = require("express").Router();
const groupCategoryController = require("../controllers/groupCategoryController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", groupCategoryController.getAll);
router.get("/:group_category_id", groupCategoryController.getById);

router.post("/", verifyAdmin, groupCategoryController.create);

router.put("/", verifyAdmin, groupCategoryController.update);

router.delete(
  "/:group_category_id",
  verifyAdmin,
  groupCategoryController.destroy
);

module.exports = router;
