const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const replied_comments = await db.RepliedComment.findAll({
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
        nest: true,
        order: [["id", "desc"]],
      });
      resolve({ status: 200, data: replied_comments });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all replied comments" },
      });
    }
  });
};
const getByUser = async (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existing_replied_comment = await db.RepliedComment.findOne({
        where: {
          user_id,
        },
      });
      resolve({ status: 200, data: existing_replied_comment });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get all replied comments" },
      });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existing_replied_comment = await db.RepliedComment.findOne({
        include: [
          {
            model: db.User,
            as: "user",
          },
        ],
        nest: true,
        where: { id },
      });
      resolve({ status: 200, data: existing_replied_comment });
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
      const created_comment = await db.RepliedComment.create(body);
      resolve({ status: 200, data: created_comment });
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
      await db.RepliedComment.update({ ...others }, { where: { id } });
      const existing_replied_comment = await getById(id);
      resolve({ status: 200, data: existing_replied_comment.data });
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
      await db.RepliedComment.destroy({ where: { id } });
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
module.exports = { getAll, getById, create, update, destroy, getByUser };
