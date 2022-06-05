const router = require("express").Router();

const colorController = require("../controllers/colorController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", colorController.getAll);
router.get("/:color_id", colorController.getById);

router.post("/", verifyAdmin, colorController.create);

router.put("/", verifyAdmin, colorController.update);

router.delete("/:color_id", verifyAdmin, colorController.destroy);

module.exports = router;
