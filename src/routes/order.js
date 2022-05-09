const router = require("express").Router();
const orderService = require("../services/orderService");

router.get("/", async (req, res) => {
  const { status, data } = await orderService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/user/:user_id", async (req, res) => {
  const { status, data } = await orderService.getByUser(req.params.user_id);
  res.status(status).json(data);
});
router.get("/:order_id", async (req, res) => {
  const { status, data } = await orderService.getById(req.params.order_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await orderService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await orderService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:order_id", async (req, res) => {
  const { status, data } = await orderService.destroy(req.params.order_id);
  res.status(status).json(data);
});

module.exports = router;
