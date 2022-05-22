const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const comments = await db.Comment.findAll({
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
        nest: true,
        order: [["id", "desc"]],
      });
      resolve({ status: 200, data: comments });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all comments" },
      });
    }
  });
};
const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existing_comment = await db.Comment.findOne({
        where: {
          user_id,
        },
      });
      resolve({ status: 200, data: existing_comment });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all comments" },
      });
    }
  });
};
const getByProduct = async (query, product_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { limit, p } = query;
      const options = {
        where: {
          product_id,
        },
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
        nest: true,
      };
      if (limit) {
        options.limit = parseInt(limit);
      }
      if (p && limit) {
        options.offset = (parseInt(p) - 1) * parseInt(limit);
      }
      const existing_comments = await db.Comment.findAll(options);
      const count = await db.Comment.count({
        where: {
          product_id,
        },
      });
      resolve({
        status: 200,
        data: {
          items: existing_comments,
          total_page: limit ? Math.ceil(count / parseInt(limit)) : 1,
          total_result: count,
        },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all comments" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existing_comment = await db.Comment.findOne({
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
        nest: true,
        where: { id },
      });
      resolve({ status: 200, data: existing_comment });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get comment by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { user_id, product_id } = body;
      const existing_comment = await db.Comment.findOne({
        where: {
          user_id,
          product_id,
        },
      });
      if (!existing_comment) {
        const created_comment = await db.Comment.create(body);
        resolve({ status: 200, data: created_comment });
      } else {
        resolve({ status: 200, data: existing_comment });
      }
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new comment" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Comment.update({ ...others }, { where: { id } });
      const existing_comment = await getById(id);
      resolve({ status: 200, data: existing_comment.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error update comment" },
      });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Comment.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this comment is deleted" },
      });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error delete comment" },
      });
    }
  });
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
  getByUser,
  getByProduct,
};
