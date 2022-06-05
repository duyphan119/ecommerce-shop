const colorService = require("../services/colorService");

const colorController = {
  getAll: async (req, res) => {
    const { status, data } = await colorService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await colorService.getById(req.params.color_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await colorService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await colorService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await colorService.destroy(req.params.color_id);
    res.status(status).json(data);
  },
};

module.exports = colorController;
