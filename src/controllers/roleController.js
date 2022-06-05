const roleService = require("../services/roleService");

const roleController = {
  getAll: async (req, res) => {
    const { status, data } = await roleService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await roleService.getById(req.params.role_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await roleService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await roleService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await roleService.destroy(req.params.role_id);
    res.status(status).json(data);
  },
};

module.exports = roleController;
