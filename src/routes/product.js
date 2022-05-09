const router = require("express").Router();
const productService = require("../services/productService");

router.get("/", async (req, res) => {
  const { status, data } = await productService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/gender/:gender_slug", async (req, res) => {
  const { status, data } = await productService.getByGenderSlug(
    req.query,
    req.params.gender_slug
  );
  res.status(status).json(data);
});
router.get("/group-category/:group_category_slug", async (req, res) => {
  const { status, data } = await productService.getByGroupCategorySlug(
    req.query,
    req.params.group_category_slug
  );
  res.status(status).json(data);
});
router.get("/category/:category_slug", async (req, res) => {
  const { status, data } = await productService.getByCategorySlug(
    req.query,
    req.params.category_slug
  );
  res.status(status).json(data);
});
router.get("/slug/:product_slug", async (req, res) => {
  const { status, data } = await productService.getBySlug(
    req.params.product_slug
  );
  res.status(status).json(data);
});
router.get("/:product_id", async (req, res) => {
  const { status, data } = await productService.getById(req.params.product_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await productService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await productService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:product_id", async (req, res) => {
  const { status, data } = await productService.destroy(req.params.product_id);
  res.status(status).json(data);
});

module.exports = router;
