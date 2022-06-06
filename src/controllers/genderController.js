const genderService = require("../services/genderService");

const genderController = {
  getAll: async (req, res) => {
    const { status, data } = await genderService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await genderService.getById(req.params.gender_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await genderService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await genderService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await genderService.destroy(req.params.gender_id);
    res.status(status).json(data);
  },
};
module.exports = genderController;
