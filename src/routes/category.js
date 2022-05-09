const router = require("express").Router();
const categoryService = require("../services/categoryService");

router.get("/", async (req, res) => {
  const { status, data } = await categoryService.getAll();
  res.status(status).json(data);
});
router.get("/:category_id", async (req, res) => {
  const { status, data } = await categoryService.getById(
    req.params.category_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await categoryService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await categoryService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:category_id", async (req, res) => {
  const { status, data } = await categoryService.destroy(
    req.params.category_id
  );
  res.status(status).json(data);
});

module.exports = router;
