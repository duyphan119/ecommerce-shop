const router = require("express").Router();
const cartController = require("../controllers/cartController");
const {
  verifyTokenAndUser,
  verifyToken,
  verifyAdmin,
} = require("../middlewares/authMiddleware");

router.get("/", cartController.getAll);
router.get("/user/:user_id", verifyTokenAndUser, cartController.getByUserId);
router.get("/:cart_id", cartController.getById);

router.post("/", verifyToken, cartController.create);

router.put("/", verifyToken, cartController.update);

router.delete("/:cart_id", verifyAdmin, cartController.destroy);

module.exports = router;
