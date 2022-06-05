const discountService = require("../services/discountService");

const discountController = {
  getAll: async (req, res) => {
    const { status, data } = await discountService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await discountService.getById(
      req.params.discount_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await discountService.create(req.query, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await discountService.update(req.query, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await discountService.destroy(
      req.params.discount_id
    );
    res.status(status).json(data);
  },
  destroyMany: async (req, res) => {
    console.log("req.body", req.body);
    const { status, data } = await discountService.destroyMany(req.body);
    res.status(status).json(data);
  },
};

module.exports = discountController;
