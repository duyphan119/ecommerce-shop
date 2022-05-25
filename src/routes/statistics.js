const router = require("express").Router();
const statisticsService = require("../services/statisticsService");

router.get("/revenue", async (req, res) => {
  const { status, data } = await statisticsService.getRevenue(req.query);
  res.status(status).json(data);
});
router.get("/user", async (req, res) => {
  const { status, data } = await statisticsService.getUser(req.query);
  res.status(status).json(data);
});
router.get("/order", async (req, res) => {
  const { status, data } = await statisticsService.getOrder(req.query);
  res.status(status).json(data);
});
router.get("/comment", async (req, res) => {
  const { status, data } = await statisticsService.getComment(req.query);
  res.status(status).json(data);
});

module.exports = router;
