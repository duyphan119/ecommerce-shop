const authService = require("../services/authService");

const authController = {
  register: async (req, res) => {
    const { status, data } = await authService.register(req.body);
    res.status(status).json(data);
  },
  login: async (req, res) => {
    const { status, data } = await authService.login(req.body, res);
    res.status(status).json(data);
  },
  logout: (req, res) => {
    const { status, data } = authService.logout(res);
    res.status(status).json(data);
  },
  refresh: async (req, res) => {
    const { status, data } = await authService.refreshToken(req);
    res.status(status).json(data);
  },
};

module.exports = authController;
