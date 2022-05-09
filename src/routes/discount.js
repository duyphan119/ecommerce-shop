const router = require("express").Router();
const discountService = require("../services/discountService");

router.get("/", async (req, res) => {
  const { status, data } = await discountService.getAll();
  res.status(status).json(data);
});
router.get("/:discount_id", async (req, res) => {
  const { status, data } = await discountService.getById(
    req.params.discount_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await discountService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await discountService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:discount_id", async (req, res) => {
  const { status, data } = await discountService.destroy(
    req.params.discount_id
  );
  res.status(status).json(data);
});

module.exports = router;
