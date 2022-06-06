const materialService = require("../services/materialService");

const materialController = {
  getAll: async (req, res) => {
    const { status, data } = await materialService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await materialService.getById(
      req.params.material_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await materialService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await materialService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await materialService.destroy(
      req.params.material_id
    );
    res.status(status).json(data);
  },
};
module.exports = materialController;
