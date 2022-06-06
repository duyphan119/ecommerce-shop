const productUserService = require("../services/productUserService");

const productUserController = {
  create: async (req, res) => {
    const { status, data } = await productUserService.create(req.body);
    res.status(status).json(data);
  },
  destroyByProduct: async (req, res) => {
    const { status, data } = await productUserService.destroyByProduct(
      req.user,
      req.params.product_id
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await productUserService.destroy(
      req.params.product_user_id
    );
    res.status(status).json(data);
  },
};
module.exports = productUserController;
