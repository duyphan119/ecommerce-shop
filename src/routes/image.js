const router = require("express").Router();
const imageController = require("../controllers/imageController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", imageController.getAll);
router.get("/:image_id", imageController.getById);

router.post("/", verifyAdmin, imageController.create);

router.put("/", verifyAdmin, imageController.update);

router.delete("/", verifyAdmin, imageController.destroyMany);
router.delete("/:image_id", verifyAdmin, imageController.destroy);

module.exports = router;
