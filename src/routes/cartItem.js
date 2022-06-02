const router = require("express").Router();
const cartItemController = require("../controllers/cartItemController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", cartItemController.getAll);
router.get("/:cart_item_id", cartItemController.getById);

router.post("/", verifyToken, cartItemController.create);

router.put("/", verifyToken, cartItemController.update);

router.delete("/:cart_item_id", verifyToken, cartItemController.destroy);
router.delete("/", verifyToken, cartItemController.destroyMany);

module.exports = router;
