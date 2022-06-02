const productService = require("../services/productService");

const productController = {
  getAll: async (req, res) => {
    const { status, data } = await productService.getAll(req.user, req.query);
    res.status(status).json(data);
  },
  getByGenderSlug: async (req, res) => {
    const { status, data } = await productService.getByGenderSlug(
      req.user,
      req.query,
      req.params.gender_slug
    );
    res.status(status).json(data);
  },
  getByGroupCategorySlug: async (req, res) => {
    const { status, data } = await productService.getByGroupCategorySlug(
      req.user,
      req.query,
      req.params.group_category_slug
    );
    res.status(status).json(data);
  },
  getByCategorySlug: async (req, res) => {
    const { status, data } = await productService.getByCategorySlug(
      req.user,
      req.query,
      req.params.category_slug
    );
    res.status(status).json(data);
  },
  search: async (req, res) => {
    const { status, data } = await productService.search(req.user, req.query);
    res.status(status).json(data);
  },
  getBySlug: async (req, res) => {
    const { status, data } = await productService.getBySlug(
      req.user,
      req.params.product_slug
    );
    res.status(status).json(data);
  },
  getByUserId: async (req, res) => {
    const { status, data } = await productService.getByUser(
      req.params.user_id,
      req.query
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await productService.getById(
      req.user,
      req.params.product_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await productService.create(req.user, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await productService.update(req.user, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await productService.destroy(
      req.user,
      req.params.product_id
    );
    res.status(status).json(data);
  },
};

module.exports = productController;
