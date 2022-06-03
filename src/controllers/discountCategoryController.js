const discountCategoryService = require("../services/discountCategoryService");

const discountController = {
  getAll: async (req, res) => {
    const { status, data } = await discountCategoryService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await discountCategoryService.getById(
      req.params.discount_category_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await discountCategoryService.create(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await discountCategoryService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await discountCategoryService.destroy(
      req.params.discount_category_id
    );
    res.status(status).json(data);
  },
};

module.exports = discountController;
