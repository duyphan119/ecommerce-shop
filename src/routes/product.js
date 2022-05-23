const router = require("express").Router();
const { getUser } = require("../middlewares/authMiddleware");
const productService = require("../services/productService");

router.get("/", getUser, async (req, res) => {
  const { status, data } = await productService.getAll(req.user, req.query);
  res.status(status).json(data);
});
router.get("/gender/:gender_slug", getUser, async (req, res) => {
  const { status, data } = await productService.getByGenderSlug(
    req.user,
    req.query,
    req.params.gender_slug
  );
  res.status(status).json(data);
});
router.get(
  "/group-category/:group_category_slug",
  getUser,
  async (req, res) => {
    const { status, data } = await productService.getByGroupCategorySlug(
      req.user,
      req.query,
      req.params.group_category_slug
    );
    res.status(status).json(data);
  }
);
router.get("/category/:category_slug", getUser, async (req, res) => {
  const { status, data } = await productService.getByCategorySlug(
    req.user,
    req.query,
    req.params.category_slug
  );
  res.status(status).json(data);
});
router.get("/search", getUser, async (req, res) => {
  const { status, data } = await productService.search(req.user, req.query);
  res.status(status).json(data);
});
router.get("/slug/:product_slug", getUser, async (req, res) => {
  const { status, data } = await productService.getBySlug(
    req.user,
    req.params.product_slug
  );
  res.status(status).json(data);
});
router.get("/user/:user_id", getUser, async (req, res) => {
  const { status, data } = await productService.getByUser(
    req.params.user_id,
    req.query
  );
  res.status(status).json(data);
});
router.get("/:product_id", getUser, async (req, res) => {
  const { status, data } = await productService.getById(
    req.user,
    req.params.product_id
  );
  res.status(status).json(data);
});
router.post("/", getUser, async (req, res) => {
  const { status, data } = await productService.create(req.user, req.body);
  res.status(status).json(data);
});
router.put("/", getUser, async (req, res) => {
  const { status, data } = await productService.update(req.user, req.body);
  res.status(status).json(data);
});
router.delete("/:product_id", getUser, async (req, res) => {
  const { status, data } = await productService.destroy(
    req.user,
    req.params.product_id
  );
  res.status(status).json(data);
});

module.exports = router;
