const router = require("express").Router();
const productMaterialService = require("../services/productMaterialService");

router.get("/", async (req, res) => {
  const { status, data } = await productMaterialService.getAll();
  res.status(status).json(data);
});
router.get("/:product_material_id", async (req, res) => {
  const { status, data } = await productMaterialService.getById(
    req.params.product_material_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await productMaterialService.create(
    req.query,
    req.body
  );
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await productMaterialService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:product_material_id", async (req, res) => {
  const { status, data } = await productMaterialService.destroy(
    req.params.product_material_id
  );
  res.status(status).json(data);
});

module.exports = router;
