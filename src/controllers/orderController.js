const orderService = require("../services/orderService");

const orderController = {
  getAll: async (req, res) => {
    const { status, data } = await orderService.getAll(req.query);
    res.status(status).json(data);
  },
  getByUser: async (req, res) => {
    const { status, data } = await orderService.getByUser(
      req.query,
      req.params.user_id
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await orderService.getById(req.params.order_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await orderService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await orderService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await orderService.destroy(req.params.order_id);
    res.status(status).json(data);
  },
};
module.exports = orderController;
