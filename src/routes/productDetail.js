const router = require("express").Router();
const productDetailService = require("../services/productDetailService");

router.get("/", async (req, res) => {
  const { status, data } = await productDetailService.getAll();
  res.status(status).json(data);
});
router.get("/:product_detail_id", async (req, res) => {
  const { status, data } = await productDetailService.getById(
    req.params.product_detail_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  console.log(req.query, req.body);
  const { status, data } = await productDetailService.create(
    req.query,
    req.body
  );
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await productDetailService.update(
    req.query,
    req.body
  );
  res.status(status).json(data);
});
router.delete("/:product_detail_id", async (req, res) => {
  const { status, data } = await productDetailService.destroy(
    req.query,
    req.params.product_detail_id
  );
  res.status(status).json(data);
});

module.exports = router;
