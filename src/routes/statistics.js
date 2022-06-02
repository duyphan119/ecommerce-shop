const router = require("express").Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/revenue", statisticsController.getRevenue);
router.get("/user", statisticsController.getUser);
router.get("/order", statisticsController.getOrder);
router.get("/comment", statisticsController.getComment);
router.get("/product", statisticsController.getProduct);

module.exports = router;
