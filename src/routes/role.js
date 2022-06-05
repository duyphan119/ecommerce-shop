const router = require("express").Router();

const roleController = require("../controllers/roleController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", roleController.getAll);
router.get("/:role_id", roleController.getById);

router.post("/", verifyAdmin, roleController.create);

router.put("/", verifyAdmin, roleController.update);

router.delete("/:role_id", verifyAdmin, roleController.destroy);

module.exports = router;
