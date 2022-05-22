const router = require("express").Router();
const repliedCommentService = require("../services/repliedCommentService");

router.get("/", async (req, res) => {
  const { status, data } = await repliedCommentService.getAll();
  res.status(status).json(data);
});
router.get("/user/:user_id", async (req, res) => {
  const { status, data } = await repliedCommentService.getByUser(
    req.params.user_id
  );
  res.status(status).json(data);
});
router.get("/:replied_comment_id", async (req, res) => {
  const { status, data } = await repliedCommentService.getById(
    req.params.replied_comment_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await repliedCommentService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await repliedCommentService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:replied_comment_id", async (req, res) => {
  const { status, data } = await repliedCommentService.destroy(
    req.params.replied_comment_id
  );
  res.status(status).json(data);
});

module.exports = router;
