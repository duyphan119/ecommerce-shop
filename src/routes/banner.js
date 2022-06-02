const router = require("express").Router();
const { verifyAdmin } = require("../middlewares/authMiddleware");
const bannerController = require("../controllers/bannerController");

router.get("/", bannerController.getAll);
router.get("/:banner_id", bannerController.getById);

router.post("/", verifyAdmin, bannerController.create);

router.put("/", verifyAdmin, bannerController.update);

router.delete("/:banner_id", verifyAdmin, bannerController.destroy);

module.exports = router;
