const router = require("express").Router();
const orderItemService = require("../services/orderItemService");

router.get("/", async (req, res) => {
  const { status, data } = await orderItemService.getAll();
  res.status(status).json(data);
});
router.get("/:order_item_id", async (req, res) => {
  const { status, data } = await orderItemService.getById(
    req.params.order_item_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await orderItemService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await orderItemService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:order_item_id", async (req, res) => {
  const { status, data } = await orderItemService.destroy(
    req.params.order_item_id
  );
  res.status(status).json(data);
});

module.exports = router;
