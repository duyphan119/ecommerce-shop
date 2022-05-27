const router = require("express").Router();
const bannerService = require("../services/bannerService");

router.get("/", async (req, res) => {
  const { status, data } = await bannerService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/:banner_id", async (req, res) => {
  const { status, data } = await bannerService.getById(req.params.banner_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await bannerService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await bannerService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:banner_id", async (req, res) => {
  const { status, data } = await bannerService.destroy(req.params.banner_id);
  res.status(status).json(data);
});

module.exports = router;
