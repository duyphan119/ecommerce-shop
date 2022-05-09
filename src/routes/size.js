const router = require("express").Router();
const sizeService = require("../services/sizeService");

router.get("/", async (req, res) => {
  const { status, data } = await sizeService.getAll();
  res.status(status).json(data);
});
router.get("/:size_id", async (req, res) => {
  const { status, data } = await sizeService.getById(req.params.size_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await sizeService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await sizeService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:size_id", async (req, res) => {
  const { status, data } = await sizeService.destroy(req.params.size_id);
  res.status(status).json(data);
});

module.exports = router;
