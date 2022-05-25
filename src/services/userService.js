const db = require("../models");
const bcrypt = require("bcryptjs");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await db.User.findAll({
        order: [["id", "desc"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Role,
            as: "role",
          },
        ],
        nest: true,
      });
      resolve({ status: 200, data: users });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error get all users" } });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Role,
            as: "role",
          },
          {
            model: db.Cart,
            as: "cart",
          },
        ],
      });
      resolve({ status: 200, data: existingUser });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get user by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = bcrypt.hashSync(
        body.password,
        bcrypt.genSaltSync(10)
      );

      let existingUser = await db.User.findOne({
        where: {
          email: body.email,
        },
      });

      if (existingUser) {
        resolve({
          status: 500,
          data: { error, message: "error create new user" },
        });
      } else {
        const createdUser = await db.User.create({
          ...body,
          password: hashedPassword,
        });
        existingUser = await getById(createdUser.id);
        resolve({ status: 200, data: existingUser.data });
      }
    } catch (error) {
      console.log(error);
      resolve({
        status: 500,
        data: { error, message: "error create new user" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.User.update(others, { where: { id } });
      const existingUser = await getById(id);
      resolve({ status: 200, data: existingUser.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update user" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.User.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this user is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete user" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
