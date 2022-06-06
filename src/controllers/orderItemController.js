const orderItemService = require("../services/orderItemService");

const orderItemController = {
  getAll: async (req, res) => {
    const { status, data } = await orderItemService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await orderItemService.getById(
      req.params.order_item_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await orderItemService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await orderItemService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await orderItemService.destroy(
      req.params.order_item_id
    );
    res.status(status).json(data);
  },
};
module.exports = orderItemController;
