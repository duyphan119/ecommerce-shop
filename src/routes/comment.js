const router = require("express").Router();

const commentController = require("../controllers/commentController");

router.get("/", commentController.getAll);
router.get("/product/:product_id", commentController.getByProduct);
router.get(
  "/user/:user_id/product/:product_id",
  commentController.getByUserProduct
);
router.get("/:comment_id", commentController.getById);

router.post("/", commentController.create);

router.put("/", commentController.update);

router.delete("/:comment_id", commentController.destroy);

module.exports = router;
