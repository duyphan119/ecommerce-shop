const router = require("express").Router();
const cartService = require("../services/cartService");

router.get("/", async (req, res) => {
  const { status, data } = await cartService.getAll();
  res.status(status).json(data);
});
router.get("/user/:user_id", async (req, res) => {
  const { status, data } = await cartService.getByUser(req.params.user_id);
  res.status(status).json(data);
});
router.get("/:cart_id", async (req, res) => {
  const { status, data } = await cartService.getById(req.params.cart_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await cartService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await cartService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:cart_id", async (req, res) => {
  const { status, data } = await cartService.destroy(req.params.cart_id);
  res.status(status).json(data);
});

module.exports = router;
