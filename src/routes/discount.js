const router = require("express").Router();

const discountController = require("../controllers/discountController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", discountController.getAll);
router.get("/:discount_id", discountController.getById);

router.post("/", verifyAdmin, discountController.create);

router.put("/", verifyAdmin, discountController.update);

router.delete("/:discount_id", verifyAdmin, discountController.destroy);

module.exports = router;
