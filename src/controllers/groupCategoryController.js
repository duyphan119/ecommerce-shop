const groupCategoryService = require("../services/groupCategoryService");

const groupCategoryController = {
  getAll: async (req, res) => {
    const { status, data } = await groupCategoryService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await groupCategoryService.getById(
      req.params.group_category_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await groupCategoryService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await groupCategoryService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await groupCategoryService.destroy(
      req.params.group_category_id
    );
    res.status(status).json(data);
  },
};
module.exports = groupCategoryController;
