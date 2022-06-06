const sizeGuideService = require("../services/sizeGuideService");

const sizeGuideController = {
  getAll: async (req, res) => {
    const { status, data } = await sizeGuideService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await sizeGuideService.getById(
      req.params.size_guide_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await sizeGuideService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await sizeGuideService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await sizeGuideService.destroy(
      req.params.size_guide_id
    );
    res.status(status).json(data);
  },
};

module.exports = sizeGuideController;
