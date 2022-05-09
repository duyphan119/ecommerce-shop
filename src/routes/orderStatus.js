const router = require("express").Router();
const orderStatusService = require("../services/orderStatusService");

router.get("/", async (req, res) => {
  const { status, data } = await orderStatusService.getAll();
  res.status(status).json(data);
});
router.get("/:order_status_id", async (req, res) => {
  const { status, data } = await orderStatusService.getById(
    req.params.order_status_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await orderStatusService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await orderStatusService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:order_status_id", async (req, res) => {
  const { status, data } = await orderStatusService.destroy(
    req.params.order_status_id
  );
  res.status(status).json(data);
});

module.exports = router;
