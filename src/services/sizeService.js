const db = require("../models");
const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sizes = await db.Size.findAll();
      resolve({ status: 200, data: sizes });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error get all sizes" } });
    }
  });
};
const getById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingSize = await db.Size.findOne({ where: { id } });
      resolve({ status: 200, data: existingSize });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error get size by id" },
      });
    }
  });
};
const create = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdSize = await db.Size.create(body);
      existingSize = await getById(createdSize.id);
      resolve({ status: 200, data: existingSize.data });
    } catch (error) {
      resolve({
        status: 500,
        data: { error, message: "error create new size" },
      });
    }
  });
};
const update = async (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, ...others } = body;
      await db.Size.update(others, { where: { id } });
      const existingSize = await getById(id);
      resolve({ status: 200, data: existingSize.data });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error update size" } });
    }
  });
};
const destroy = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Size.destroy({ where: { id } });
      resolve({
        status: 200,
        data: { message: "this size is deleted" },
      });
    } catch (error) {
      resolve({ status: 500, data: { error, message: "error delete size" } });
    }
  });
};
module.exports = { getAll, getById, create, update, destroy };
