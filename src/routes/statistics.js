const router = require("express").Router();
const statisticsService = require("../services/statisticsService");

router.get("/revenue", async (req, res) => {
  const { status, data } = await statisticsService.getRevenue(req.query);
  res.status(status).json(data);
});

module.exports = router;
