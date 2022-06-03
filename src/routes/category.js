const router = require("express").Router();

const categoryController = require("../controllers/categoryController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", categoryController.getAll);
router.get("/:category_id", categoryController.getById);

router.post("/", verifyAdmin, categoryController.create);

router.put("/", verifyAdmin, categoryController.update);

router.delete("/:category_id", verifyAdmin, categoryController.destroy);

module.exports = router;
