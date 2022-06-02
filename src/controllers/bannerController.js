const bannerService = require("../services/bannerService");
const bannerController = {
  getAll: async (req, res) => {
    const { status, data } = await bannerService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await bannerService.getById(req.params.banner_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await bannerService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await bannerService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await bannerService.destroy(req.params.banner_id);
    res.status(status).json(data);
  },
};
module.exports = bannerController;
