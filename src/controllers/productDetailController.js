const productDetailService = require("../services/productDetailService");

const productDetailController = {
  getAll: async (req, res) => {
    const { status, data } = await productDetailService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await productDetailService.getById(
      req.params.product_detail_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await productDetailService.create(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await productDetailService.update(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await productDetailService.destroy(
      req.query,
      req.params.product_detail_id
    );
    res.status(status).json(data);
  },
};
module.exports = productDetailController;
