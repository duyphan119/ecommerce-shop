const imageService = require("../services/imageService");

const imageController = {
  getAll: async (req, res) => {
    const { status, data } = await imageService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await imageService.getById(req.params.image_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await imageService.create(req.query, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await imageService.update(req.body);
    res.status(status).json(data);
  },
  destroyMany: async (req, res) => {
    const { status, data } = await imageService.destroyMany(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await imageService.destroy(req.params.image_id);
    res.status(status).json(data);
  },
};
module.exports = imageController;
