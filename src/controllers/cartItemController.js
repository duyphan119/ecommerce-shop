const cartItemService = require("../services/cartItemService");

const cartItemController = {
  getAll: async (req, res) => {
    const { status, data } = await cartItemService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await cartItemService.getById(
      req.params.cart_item_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await cartItemService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await cartItemService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await cartItemService.destroy(
      req.params.cart_item_id
    );
    res.status(status).json(data);
  },
  destroyMany: async (req, res) => {
    const { status, data } = await cartItemService.destroyMany(req.body);
    res.status(status).json(data);
  },
};

module.exports = cartItemController;
