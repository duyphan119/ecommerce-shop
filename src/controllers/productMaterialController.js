const productMaterialService = require("../services/productMaterialService");

const productMaterialController = {
  getAll: async (req, res) => {
    const { status, data } = await productMaterialService.getAll();
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await productMaterialService.getById(
      req.params.product_material_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await productMaterialService.create(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await productMaterialService.update(
      req.query,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await productMaterialService.destroy(
      req.query,
      req.params.product_material_id
    );
    res.status(status).json(data);
  },
  destroyMany: async (req, res) => {
    const { status, data } = await productMaterialService.destroy(
      req.query,
      req.params.product_material_id
    );
    res.status(status).json(data);
  },
};
module.exports = productMaterialController;
