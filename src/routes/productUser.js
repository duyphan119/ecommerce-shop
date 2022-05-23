const router = require("express").Router();
const { getUser } = require("../middlewares/authMiddleware");
const productUserService = require("../services/productUserService");

router.post("/", async (req, res) => {
  const { status, data } = await productUserService.create(req.body);
  res.status(status).json(data);
});
router.delete("/product/:product_id", getUser, async (req, res) => {
  const { status, data } = await productUserService.destroyByProduct(
    req.user,
    req.params.product_id
  );
  res.status(status).json(data);
});
router.delete("/:product_user_id", async (req, res) => {
  const { status, data } = await productUserService.destroy(
    req.params.product_user_id
  );
  res.status(status).json(data);
});

module.exports = router;
