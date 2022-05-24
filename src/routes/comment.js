const router = require("express").Router();
const commentService = require("../services/commentService");

router.get("/", async (req, res) => {
  const { status, data } = await commentService.getAll();
  res.status(status).json(data);
});
router.get("/product/:product_id", async (req, res) => {
  const { status, data } = await commentService.getByProduct(
    req.query,
    req.params.product_id
  );
  res.status(status).json(data);
});
router.get("/user/:user_id/product/:product_id", async (req, res) => {
  const { status, data } = await commentService.getByUserProduct(
    req.params.user_id,
    req.params.product_id
  );
  res.status(status).json(data);
});
router.get("/:comment_id", async (req, res) => {
  const { status, data } = await commentService.getById(req.params.comment_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await commentService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await commentService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:comment_id", async (req, res) => {
  const { status, data } = await commentService.destroy(req.params.comment_id);
  res.status(status).json(data);
});

module.exports = router;
