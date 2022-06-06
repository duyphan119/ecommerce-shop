const userService = require("../services/userService");

const userController = {
  getAll: async (req, res) => {
    const { status, data } = await userService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await userService.getById(req.params.user_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await userService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await userService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await userService.destroy(req.params.user_id);
    res.status(status).json(data);
  },
};

module.exports = userController;
