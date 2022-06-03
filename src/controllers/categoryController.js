const categoryService = require("../services/categoryService");

const categoryController = {
  getAll: async (req, res) => {
    const { status, data } = await categoryService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await categoryService.getById(
      req.params.category_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await categoryService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await categoryService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await categoryService.destroy(
      req.params.category_id
    );
    res.status(status).json(data);
  },
};

module.exports = categoryController;
