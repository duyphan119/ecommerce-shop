const commentService = require("../services/commentService");

const commentController = {
  getAll: async (req, res) => {
    const { status, data } = await commentService.getAll(req.query);
    res.status(status).json(data);
  },
  getByProduct: async (req, res) => {
    const { status, data } = await commentService.getByProduct(
      req.query,
      req.params.product_id
    );
    res.status(status).json(data);
  },
  getByUserProduct: async (req, res) => {
    const { status, data } = await commentService.getByUserProduct(
      req.params.user_id,
      req.params.product_id
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await commentService.getById(
      req.params.comment_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await commentService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await commentService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await commentService.destroy(
      req.params.comment_id
    );
    res.status(status).json(data);
  },
};
module.exports = commentController;
