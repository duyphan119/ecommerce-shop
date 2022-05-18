const upload = require("../middlewares/upload");
const uploadService = require("../services/uploadService");

const router = require("express").Router();

router.post("/", upload.array("images", 100), async (req, res) => {
  const { status, data } = await uploadService.upload(req.files);
  res.status(status).json(data);
});

module.exports = router;
