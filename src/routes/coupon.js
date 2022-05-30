const router = require("express").Router();
const couponService = require("../services/couponService");

router.get("/", async (req, res) => {
  const { status, data } = await couponService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/:coupon_id", async (req, res) => {
  const { status, data } = await couponService.getById(req.params.coupon_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await couponService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await couponService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:coupon_id", async (req, res) => {
  const { status, data } = await couponService.destroy(req.params.coupon_id);
  res.status(status).json(data);
});

module.exports = router;
