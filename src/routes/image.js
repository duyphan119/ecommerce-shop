const router = require("express").Router();
const imageService = require("../services/imageService");

router.get("/", async (req, res) => {
  const { status, data } = await imageService.getAll();
  res.status(status).json(data);
});
router.get("/:image_id", async (req, res) => {
  const { status, data } = await imageService.getById(req.params.image_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await imageService.create(req.query, req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await imageService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:image_id", async (req, res) => {
  const { status, data } = await imageService.destroy(req.params.image_id);
  res.status(status).json(data);
});

module.exports = router;
