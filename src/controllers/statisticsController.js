const statisticsService = require("../services/statisticsService");

const statisticsController = {
  getRevenue: async (req, res) => {
    const { status, data } = await statisticsService.getRevenue(req.query);
    res.status(status).json(data);
  },
  getUser: async (req, res) => {
    const { status, data } = await statisticsService.getUser(req.query);
    res.status(status).json(data);
  },
  getOrder: async (req, res) => {
    const { status, data } = await statisticsService.getOrder(req.query);
    res.status(status).json(data);
  },
  getComment: async (req, res) => {
    const { status, data } = await statisticsService.getComment(req.query);
    res.status(status).json(data);
  },
  getProduct: async (req, res) => {
    const { status, data } = await statisticsService.getProduct(req.query);
    res.status(status).json(data);
  },
};

module.exports = statisticsController;
