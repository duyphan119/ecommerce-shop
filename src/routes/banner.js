const router = require("express").Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const bannerService = require("../services/bannerService");

router.get("/", async (req, res) => {
  const { status, data } = await bannerService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/:banner_id", async (req, res) => {
  const { status, data } = await bannerService.getById(req.params.banner_id);
  res.status(status).json(data);
});
router.post("/", verifyAdmin, async (req, res) => {
  const { status, data } = await bannerService.create(req.body);
  res.status(status).json(data);
});
router.put("/", verifyAdmin, async (req, res) => {
  const { status, data } = await bannerService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:banner_id", verifyAdmin, async (req, res) => {
  const { status, data } = await bannerService.destroy(req.params.banner_id);
  res.status(status).json(data);
});

module.exports = router;
