const couponService = require("../services/couponService");

const couponController = {
  getAll: async (req, res) => {
    const { status, data } = await couponService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await couponService.getById(req.params.coupon_id);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await couponService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await couponService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await couponService.destroy(req.params.coupon_id);
    res.status(status).json(data);
  },
};

module.exports = couponController;
