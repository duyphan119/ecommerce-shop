const router = require("express").Router();
const userService = require("../services/userService");

router.get("/", async (req, res) => {
  const { status, data } = await userService.getAll();
  res.status(status).json(data);
});
router.get("/:user_id", async (req, res) => {
  const { status, data } = await userService.getById(req.params.user_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await userService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await userService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:user_id", async (req, res) => {
  const { status, data } = await userService.destroy(req.params.user_id);
  res.status(status).json(data);
});

module.exports = router;
