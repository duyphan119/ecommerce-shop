const router = require("express").Router();
const genderService = require("../services/genderService");

router.get("/", async (req, res) => {
  const { status, data } = await genderService.getAll();
  res.status(status).json(data);
});
router.get("/:gender_id", async (req, res) => {
  const { status, data } = await genderService.getById(req.params.gender_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await genderService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await genderService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:gender_id", async (req, res) => {
  const { status, data } = await genderService.destroy(req.params.gender_id);
  res.status(status).json(data);
});

module.exports = router;
