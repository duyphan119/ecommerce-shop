const router = require("express").Router();
const materialService = require("../services/materialService");

router.get("/", async (req, res) => {
  const { status, data } = await materialService.getAll();
  res.status(status).json(data);
});
router.get("/:material_id", async (req, res) => {
  const { status, data } = await materialService.getById(
    req.params.material_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await materialService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await materialService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:material_id", async (req, res) => {
  const { status, data } = await materialService.destroy(
    req.params.material_id
  );
  res.status(status).json(data);
});

module.exports = router;
