const router = require("express").Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
  const { status, data } = await authService.register(req.body);
  res.status(status).json(data);
});
router.post("/login", async (req, res) => {
  const { status, data } = await authService.login(req.body, res);
  res.status(status).json(data);
});
router.get("/refresh", async (req, res) => {
  const { status, data } = await authService.refreshToken(req);
  res.status(status).json(data);
});
module.exports = router;
