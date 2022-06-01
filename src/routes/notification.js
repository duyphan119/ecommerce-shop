const router = require("express").Router();
const notificationService = require("../services/notificationService");

router.get("/", async (req, res) => {
  const { status, data } = await notificationService.getAll(req.query);
  res.status(status).json(data);
});
router.get("/:notification_id", async (req, res) => {
  const { status, data } = await notificationService.getById(
    req.params.notification_id
  );
  res.status(status).json(data);
});
router.post("/", async (req, res) => {
  const { status, data } = await notificationService.create(req.body);
  res.status(status).json(data);
});
router.put("/", async (req, res) => {
  const { status, data } = await notificationService.update(
    req.query,
    req.body
  );
  res.status(status).json(data);
});
router.delete("/:notification_id", async (req, res) => {
  const { status, data } = await notificationService.destroy(
    req.params.notification_id
  );
  res.status(status).json(data);
});

module.exports = router;
