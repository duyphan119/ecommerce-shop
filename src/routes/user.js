const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyAdmin } = require("../middlewares/authMiddleware");

router.get("/", userController.getAll);
router.get("/:user_id", userController.getById);

router.post("/", verifyAdmin, userController.create);

router.put("/", userController.update);

router.delete("/:user_id", verifyAdmin, userController.destroy);

module.exports = router;
