const repliedCommentService = require("../services/repliedCommentService");

const repliedCommentController = {
  getAll: async (req, res) => {
    const { status, data } = await repliedCommentService.getAll();
    res.status(status).json(data);
  },
  getByUser: async (req, res) => {
    const { status, data } = await repliedCommentService.getByUser(
      req.params.user_id
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { status, data } = await repliedCommentService.getById(
      req.params.replied_comment_id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { status, data } = await repliedCommentService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { status, data } = await repliedCommentService.update(req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { status, data } = await repliedCommentService.destroy(
      req.params.replied_comment_id
    );
    res.status(status).json(data);
  },
};
module.exports = repliedCommentController;
