const router = require("express").Router();
const colorService = require("../services/colorService");

router.get("/", async (req, res) => {
  const { status, data } = await colorService.getAll();
  res.status(status).json(data);
});
router.get("/:color_id", async (req, res) => {
  const { status, data } = await colorService.getById(req.params.color_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await colorService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await colorService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:color_id", async (req, res) => {
  const { status, data } = await colorService.destroy(req.params.color_id);
  res.status(status).json(data);
});

module.exports = router;
