const router = require("express").Router();
const productController = require("../controllers/productController");
const { getUser } = require("../middlewares/authMiddleware");
const productService = require("../services/productService");

router.get("/", getUser, productController.getAll);
router.get("/gender/:gender_slug", getUser, productController.getByGenderSlug);
router.get(
  "/group-category/:group_category_slug",
  getUser,
  productController.getByGroupCategorySlug
);
router.get(
  "/category/:category_slug",
  getUser,
  productController.getByCategorySlug
);
router.get("/search", getUser, productController.search);
router.get("/slug/:product_slug", getUser, productController.getBySlug);
router.get("/user/:user_id", getUser, productController.getByUserId);
router.get("/:product_id", getUser, productController.getById);

router.post("/", getUser, productController.create);

router.put("/", getUser, productController.update);

router.delete("/:product_id", getUser, productController.destroy);

module.exports = router;
