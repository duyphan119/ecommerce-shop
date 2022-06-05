const notificationService = require("../services/notificationService");

const notificationController = {
  getAll: async (req, res) => {
    const { status, data } = await notificationService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await notificationService.getById(
      req.params.notification_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await notificationService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await notificationService.update(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await notificationService.destroy(
      req.params.notification_id
    );
    res.status(status).json(data);
  },
};

module.exports = notificationController;
