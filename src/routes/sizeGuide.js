const router = require("express").Router();

const sizeGuideController = require("../controllers/sizeGuideController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", sizeGuideController.getAll);
router.get("/:size_guide_id", sizeGuideController.getById);

router.post("/", verifyAdmin, sizeGuideController.create);

router.put("/", verifyAdmin, sizeGuideController.update);

router.delete("/:size_guide_id", verifyAdmin, sizeGuideController.destroy);

module.exports = router;
