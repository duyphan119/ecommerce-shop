const router = require("express").Router();
const genderController = require("../controllers/genderController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", genderController.getAll);
router.get("/:gender_id", genderController.getById);

router.post("/", verifyAdmin, genderController.create);

router.put("/", verifyAdmin, genderController.update);

router.delete("/:gender_id", verifyAdmin, genderController.destroy);

module.exports = router;
