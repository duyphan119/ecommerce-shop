const router = require("express").Router();
const repliedCommentController = require("../controllers/repliedCommentController");
const { verifyTokenUserAndAdmin } = require("../middlewares/authMiddleware");

router.get("/", repliedCommentController.getAll);
router.get(
  "/user/:user_id",
  verifyTokenUserAndAdmin,
  repliedCommentController.getByUser
);
router.get("/:replied_comment_id", repliedCommentController.getById);

router.post("/", repliedCommentController.create);

router.put("/", repliedCommentController.update);

router.delete("/:replied_comment_id", repliedCommentController.destroy);

module.exports = router;
