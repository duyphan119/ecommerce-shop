const router = require("express").Router();

const couponController = require("../controllers/couponController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", couponController.getAll);
router.get("/:coupon_id", couponController.getById);

router.post("/", verifyAdmin, couponController.create);

router.put("/", verifyAdmin, couponController.update);

router.delete("/:coupon_id", verifyAdmin, couponController.destroy);

module.exports = router;
