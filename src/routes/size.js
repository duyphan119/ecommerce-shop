const router = require("express").Router();

const sizeController = require("../controllers/sizeController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", sizeController.getAll);
router.get("/:size_id", sizeController.getById);

router.post("/", verifyAdmin, sizeController.create);

router.put("/", verifyAdmin, sizeController.update);

router.delete("/:size_id", verifyAdmin, sizeController.destroy);

module.exports = router;
