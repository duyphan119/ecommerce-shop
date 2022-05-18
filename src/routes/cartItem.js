const router = require("express").Router();
const cartItemService = require("../services/cartItemService");

router.get("/", async (req, res) => {
  const { status, data } = await cartItemService.getAll();
  res.status(status).json(data);
});
router.get("/:cart_item_id", async (req, res) => {
  const { status, data } = await cartItemService.getById(
    req.params.cart_item_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await cartItemService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await cartItemService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:cart_item_id", async (req, res) => {
  const { status, data } = await cartItemService.destroy(
    req.params.cart_item_id
  );
  res.status(status).json(data);
});
router.delete("/", async (req, res) => {
  const { status, data } = await cartItemService.destroyMany(req.body);
  res.status(status).json(data);
});

module.exports = router;
