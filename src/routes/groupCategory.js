const router = require("express").Router();
const groupCategoryService = require("../services/groupCategoryService");

router.get("/", async (req, res) => {
  const { status, data } = await groupCategoryService.getAll();
  res.status(status).json(data);
});
router.get("/:group_category_id", async (req, res) => {
  const { status, data } = await groupCategoryService.getById(
    req.params.group_category_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await groupCategoryService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await groupCategoryService.update(req.body);
  res.status(status).json(data);
});
router.delete("/:group_category_id", async (req, res) => {
  const { status, data } = await groupCategoryService.destroy(
    req.params.group_category_id
  );
  res.status(status).json(data);
});

module.exports = router;
