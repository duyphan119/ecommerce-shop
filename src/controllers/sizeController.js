const sizeService = require("../services/sizeService");

const sizeController = {
  getAll: async (req, res) => {
    const { status, data } = await sizeService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await sizeService.getById(req.params.size_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await sizeService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await sizeService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await sizeService.destroy(req.params.size_id);
    res.status(status).json(data);
  },
};

module.exports = sizeController;
