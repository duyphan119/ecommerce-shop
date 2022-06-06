const orderStatusService = require("../services/orderStatusService");

const orderStatusController = {
  getAll: async (req, res) => {
    const { status, data } = await orderStatusService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await orderStatusService.getById(
      req.params.order_status_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await orderStatusService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await orderStatusService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await orderStatusService.destroy(
      req.params.order_status_id
    );
    res.status(status).json(data);
  },
};
module.exports = orderStatusController;
