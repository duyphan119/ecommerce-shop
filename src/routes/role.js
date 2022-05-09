const router = require("express").Router();
const roleService = require("../services/roleService");

router.get("/", async (req, res) => {
  const { status, data } = await roleService.getAll();
  res.status(status).json(data);
});
router.get("/:role_id", async (req, res) => {
  const { status, data } = await roleService.getById(req.params.role_id);
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await roleService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await roleService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:role_id", async (req, res) => {
  const { status, data } = await roleService.destroy(req.params.role_id);
  res.status(status).json(data);
});

module.exports = router;
