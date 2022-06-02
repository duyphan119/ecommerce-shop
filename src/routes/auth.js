const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

module.exports = router;
