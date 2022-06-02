const cartService = require("../services/cartService");
const cartController = {
  getAll: async (req, res) => {
    const { status, data } = await cartService.getAll();
    res.status(status).json(data);
  },
  getByUserId: async (req, res) => {
    const { status, data } = await cartService.getByUser(req.params.user_id);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await cartService.getById(req.params.cart_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await cartService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await cartService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await cartService.destroy(req.params.cart_id);
    res.status(status).json(data);
  },
};
module.exports = cartController;
